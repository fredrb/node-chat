var net = require('net');

var users = [];

var server = net.createServer(function (conn) {
    users.push(conn);
    console.log("Connection stablised with new client [" + conn.remoteAddress + "]" + conn.name);                               
    conn.name = "<" + conn.remoteAddress + ":" + conn.remotePort + ">";

    conn.on('data', function(data) {
        broadcast(data);
    });

    conn.on('end', function() {
        users.splice(users.indexOf(conn), 1);
        broadcast("[LEFT CHAT]");
    });

    function broadcast(msg) {
        process.stdout.write(conn.name + " " + msg + "\n");
        users.forEach(function(u) {
            if(u !== conn) {
                u.write(conn.name + " " +  msg + "\n");
            };
        });
        //conn.pipe(conn);
    };
});

server.listen(3000, function() {
    console.log("Server started on port 3000");
});


