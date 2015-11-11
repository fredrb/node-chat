var net = require('net');
var rl  = require('readline');

var socket = net.connect({ port : 3000}, function() {
    var command = rl.createInterface(process.stdin, process.stdout);
    command.prompt(true);

    // line listener
    command.on('line', inputCallback);

    // socket listner
    socket.on('data', function(data) {
        console.log(data.toString('utf8'));
        // process.stdout.write(data);
        command.prompt(true);
    });

    function inputCallback(line) {
        writeToSocket(line);
        command.prompt(true);
    };

    function inputHandler(cmd, defaultHandler) {
        var param = cmd.split(" ");
        switch (param[0]) {
            case "/quit" :
                return quitHandler();
            case "/nick" :
                return newNickHanlder(param);
            default :
                return defaultHandler();
        };
    };

    function quitHandler() {
        socket.end();
        process.exit();
    };

    function newNickHandler(nick) {

    };

    function writeToSocket(msg) {
        if (!socket.write(msg)) {
            process.stdout.write("Something is wrong with the connetion. Can't write to socket. Message: ", msg);
        };
    };
});
