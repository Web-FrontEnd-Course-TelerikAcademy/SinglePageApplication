"use strict"

const BaseData = require("../base/base.data");
const User = require("../../models/user.model");
const configFile = require("../../config");

var deferred = require('deferred');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this.db(options, function (error, response, body) {
            if (error) {
                return { status: false, issueMessage: "Invalid user" };
            }
            console.log(body);
        });
    }

    checkPassword(username, password) {    
        var def = deferred();    
        var options = {
            method: 'POST',
            url: 'https://baas.kinvey.com/user/kid_SJw3tuDn-/login',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: configFile.kinveyAuthorization
            },
            body: { username: username, password: password },
            json: true
        };
        this.db(options, function (error, response, body) {
            if (error) {
                def.resolve({ status: false, issueMessage: "Invalid user" });
            } else {
                console.log(body);
                def.resolve({ status: true, user: body });
            }
        });
        return def.promise;
    }
}

module.exports = UsersData;