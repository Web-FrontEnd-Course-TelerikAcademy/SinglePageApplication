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
        // .post("/merge-post", (req, res) => {
        //     return controller.mergePost(req, res);
        // })
        // .post("/modify-status", (req, res) => {
        //     return controller.modifyStatus(req, res);
        // });

    app.use("/blog", router);
};

module.exports = { attachTo };
