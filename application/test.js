var net = require('net');

var socket = net.connect( { port : 3000 } , function() {
    process.stdout.write("Connected\n");

    socket.on('data', function(data) {
        process.stdout.write(data);
    });
});
