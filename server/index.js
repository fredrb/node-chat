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

command.setCommandHandler('/kick', function(socket, target) {
    console.log("Deleting user with name " + target);
    for(u in users) {
        console.log(users[u].name + " - " + target);
        if (users[u].name == target) {
            users[u].end("You have been terminated by user " + socket.name);

        }
    }
})

var server = net.createServer(function (conn) {
    users.push(conn);
    console.log("Connection establised with new client [" + conn.remoteAddress + "]");

    if (!conn.name) {
        conn.name = "<" + conn.remoteAddress + ":" + conn.remotePort + ">";
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
        console.log(beautifyMessage(conn.name, msg));
        users.forEach(function(u) {
            if(u !== conn) {
                u.write(beautifyMessage(conn.name,msg));
            };
        });
    };

    function beautifyMessage(user, text) {
        return user + ": " + text;
    }
});

server.listen(3001, function() {
    console.log("Server started on port 3001");
});
