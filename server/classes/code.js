'use strict';

var dbcon = require('./dbcon.js');
var User = require('./user.js');

class Code {
    constructor(codeId, code, userId) {
        this.codeId = codeId;
        this.code = code;
        this.userId = userId;
    }

    //returns a code instance, to access the id: code.codeId
    static generateCode(userId, callback) {
        var c = new Code(0, Code.rndCode(userId), userId);
        //insert into db
        dbcon.query('INSERT INTO codes SET ?', { code: c.code, userId: c.userId }, function(err, result) {
            if (err) throw err;
            c.codeId = result.insertId;
            callback(c);
        });
    }


    static rndCode(userId) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text + userId;
    }

}

module.exports = Code;