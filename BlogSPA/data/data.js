"use strict"

const UsersData = require("./models/users.data"),
    PostsData = require("./models/posts.data");

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        posts: new PostsData(db)
    });
};

module.exports = { init };
