var net = require('net');
var rl  = require('readline');

var socket = net.connect({ port : 3000}, function() {
    var command = rl.createInterface(process.stdin, process.stdout);
    process.stdout.write("Connected");
    command.prompt(true);

    // line listener
    command.on('line', inputCallback);

    function inputCallback(line) {
        writeToSocket(line);
        command.prompt(true);
    };
});


function writeToSocket(msg) {
    msg += '\n';
    if (!socket.write(msg)) {
        process.stdout.write("Something is wrong with the connetion. Can't write to socket. Message: ", msg);
    };
};



