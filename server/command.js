var Handler = function(keyword, callback) {
    this.keyword = keyword;
    this.callback = callback;
}

var Command = function() {
    this.commandList = [];
}

Command.prototype.setCommandHandler = function (keyword, callback) {
    var handler = new Handler(keyword, callback);
    this.commandList.push(handler);
};

Command.prototype.executeCommand = function (socket, keyword, params) {
    for (cmd in this.commandList) {
        var tmp = this.commandList[cmd];
        if (tmp.keyword == keyword) {
            tmp.callback(socket, params);
        }
    }
};

module.exports = Command;
