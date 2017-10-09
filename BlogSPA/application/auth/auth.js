"use strict"

const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-local");

const config = require("../../config");

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.checkPassword(username, password)
            .then((user) => {
                if (user.user.error) {
                    done(null, false, { issueMessage: user.user.error + ": " + user.user.description });
                } else {
                    done(null, user.user);
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
        done(null, user.username);
    });

    passport.deserializeUser((id, done) => {
        done(null, id);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };
