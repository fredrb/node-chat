var net = require('net');
var Command = require('./command');

var users = [];

// command configuration:
command = new Command();

command.setCommandHandler('/nick', function(socket, nick) {
    // if(nick.constructor == Array)
    //     nick = nick.splice(0,1);
    console.log("[USER COMMAND]" + socket.name + " changed it's name to " + nick);
    socket.name = "<" + nick + ">";
});

command.setCommandHandler('/list', function(socket) {
    socket.write("List of users:");
    for(u in users) {
        socket.write('\n' + users[u].name);
    }
});

var server = net.createServer(function (conn) {
    users.push(conn);
    console.log("Connection establised with new client [" + conn.remoteAddress + "]");

    if (!conn.name) {
        conn.name = "<" + conn.remoteAddress + ":" + conn.remotePort + ">";
        conn.write("[SERVER]: Use /nick <username> to change your name.\n");
        conn.write("[SERVER]: Current name is : " + conn.name);
    }

    conn.on('data', function(data) {
        var str = data.toString();
        if (str[0] === '/') {
            var param = str.split(" ");
            var cmd = param.splice(0,1);
            command.executeCommand(conn, cmd, param);
        } else {
            broadcast(data);
        }
    });

    conn.on('end', function() {
        users.splice(users.indexOf(conn), 1);
        broadcast("[LEFT CHAT]");
    });

    function broadcast(msg) {
        process.stdout.write(conn.name + " " + msg + "\n");
        users.forEach(function(u) {
            if(u !== conn) {
                u.write(conn.name + ": " +  msg);
            };
        });
    };
});

server.listen(3000, function() {
    console.log("Server started on port 3000");
});
