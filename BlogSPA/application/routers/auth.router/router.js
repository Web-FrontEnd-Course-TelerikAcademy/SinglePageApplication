"use strict"

const { Router } = require("express");
const passport = require("passport");

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require("./controller").init(data);

    router
        .post("/sign-out", (req, res) => {
            return controller.signOut(req, res);
        })
        .post("/sign-up", (req, res) => {
            return controller.signUp(req, res);
        })
        .post("/sign-in", passport.authenticate("local", {
            successRedirect: "/#",
            failureRedirect: "/#auth/sign-in",
            //failureFlash: true,
            failureFlash: "Invalid username or password"
        }));

    app.use("/auth", router);
};

module.exports = { attachTo };
