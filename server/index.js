var net = require('net');

var server = net.createServer(function (conn) {
    console.log("Connection stablised with new client [" + conn.remoteAddress + "]" + conn.name);                               
    conn.name = "<" + conn.remoteAddress + ":" + conn.remotePort + ">";

    conn.on('data', function(data) {
        process.stdout.write(conn.name + " " + data);
    });

    conn.pipe(conn);
});

server.listen(3000, function() {
    console.log("Server started on port 3000");
});


