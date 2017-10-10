"use strict"

const { Router } = require("express");
const passport = require("passport");

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require("./controller").init(data);

    router
        .get("/get-posts", (req, res) => {
            return controller.getPosts(req, res);
        })
        .get("/get-comments", (req, res) => {
            return controller.getComments(req, res);
        })
        .post("/createPost", (req, res) => {
            return controller.createPost(req, res);
        })
        .post("/createComment", (req, res) => {
            return controller.createComment(req, res);
        });

    app.use("/blog", router);
};

module.exports = { attachTo };
