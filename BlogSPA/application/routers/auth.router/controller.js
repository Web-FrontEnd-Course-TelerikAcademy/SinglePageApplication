"use strict"

var configFile = require("../../../config");

class UsersController {
    constructor(data) {
        this.data = data;
    }

    getProfile(req, res) {
        if (!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        return res.render("auth/profile");
    }

    signOut(req, res) {
        if (!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        req.logout();
        return res.redirect("/");
    }

    signUp(req, res) {
        const bodyUser = req.body;
        if (bodyUser.password != bodyUser["repeat-password"]) {
            return res.render("/#auth/sign-up", { issueMessage: "Repeated password is not equal to the original one" });
        }
        var options = {
            method: 'POST',
            url: 'https://baas.kinvey.com/user/kid_SJw3tuDn-',
            headers: {
                'cache-control': 'no-cache',
                authorization: configFile.kinveyAuthorization,
                'content-type': 'application/json'
            },
            body: { 
                username: bodyUser.username, 
                password: bodyUser.password,
                email: bodyUser.email
            },
            json: true
        };

        this.data.users.db(options, function (error, response, body) {
            if (error) {
                return res.redirect("/#auth/sign-up");
            };
            if (body.error) {
                return res.redirect("/#auth/sign-up");
            };

            console.log(body);
            return res.redirect("/#auth/sign-in");
        });
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };
