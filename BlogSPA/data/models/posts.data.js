"use strict"

const BaseData = require("../base/base.data");
const Post = require("../../models/post.model");

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }


    // checkPassword(username, password) {
    //     return this.findByUsername(username)
    //         .then((user) => {
    //             if (!user) {
    //                 return { status: false, issueMessage: "Invalid user" };
    //             }

    //             if (user.password !== password) {
    //                 return { status: false, issueMessage: "Invalid password" };
    //             }

    //             return { status: true };
    //         });
    // }
}

module.exports = PostsData;