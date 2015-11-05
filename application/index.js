var net = require('net');
var rl  = require('readline');

var socket = net.connect({ port : 3000}, function() {
    var command = rl.createInterface(process.stdin, process.stdout);
    process.stdout.write("Connected");
    command.prompt(true);

    // line listener
    command.on('line', inputCallback);

    // socket listner
    socket.on('data', function(data) {
        process.stdout.write(data);
        command.prompt(true);
    });

    function inputCallback(line) {
        inputHandler(line, function() {
            writeToSocket(line);
            command.prompt(true);
        });
    };

    function inputHandler(cmd, defaultHandler) {
        switch (cmd) {
            case "/quit" :
                return quitHandler();
            default :
                return defaultHandler();
        };
    };

    function quitHandler() {
        socket.end();
        process.exit();
    };
});

function writeToSocket(msg) {
    if (!socket.write(msg)) {
        process.stdout.write("Something is wrong with the connetion. Can't write to socket. Message: ", msg);
    };
};


