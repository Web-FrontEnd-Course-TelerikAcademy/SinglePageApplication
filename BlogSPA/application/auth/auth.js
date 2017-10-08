"use strict"

const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-local");

const config = require("../../config");

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.checkPassword(username, password)
            .then((returnData) => {
                if (returnData.status) {
                    return data.users.findByUsername(username);
                }
                return "Please try again";
            })
            .then((user) => {
                if (typeof user == "string") {
                    done(null, false, { issueMessage: user });
                } else {
                    done(null, user);
                }
            })
            .catch((err) => {
                done(err);
            });
    }));

    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };