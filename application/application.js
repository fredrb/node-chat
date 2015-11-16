var net = require('net');
var rl = require('readline');

module.exports = function(host, port, name, command) {
    var client = net.connect(port, host, function() {
        // update username
        client.write("/nick " + name);      
        command.prompt(true);                            

        command.on('line', function(line) {
            sendMsg(line);          
            command.prompt(true);
        });

        client.on('data', function(data) {
            console.log(data.toString('utf8'));
            command.prompt(true);
        });

        client.on('error', function(error) {
            console.log("Ending process with error :" + error.toString('utf8')); 
            process.exit();
        });

        function sendMsg(msg) {
            if (!client.write(msg))
                console.log("Something went wrong sending the message");
        }

    });
}

