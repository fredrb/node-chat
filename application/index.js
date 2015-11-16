var rl = require('readline');
const DEFAULT_SERVER = '127.0.0.1';
const DEFAULT_PORT = '3001';

var app = require('./application.js');

var command = rl.createInterface(process.stdin, process.stdout);
var server = process.argv[2] || DEFAULT_SERVER;
//var name   = process.argb[3] || null;
var name = null;

console.log("Application started");

function checkServer() {
    if(server === DEFAULT_SERVER) {
        command.question("Default server set to (" + DEFAULT_SERVER + ") leave it blank to keep it: ", 
        function(answer) {
            server = answer || DEFAULT_SERVER;
            checkUsername();
        });
    }
}

function checkUsername() {
    if(name === null ) {
        command.question("Please enter a name: ", function(answer) {
            name = answer || "DummyBot123";    
            app(server, DEFAULT_PORT, name, command);
        });
    }
}

checkServer();





