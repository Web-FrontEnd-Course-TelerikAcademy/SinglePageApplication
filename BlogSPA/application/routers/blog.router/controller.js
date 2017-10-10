
"use strict"

var configFile = require("../../../config");

class BlogController {
    constructor(data) {
        this.data = data;
    }

    getPosts(req, res) {
        var options = {
            method: 'GET',
            url: 'https://baas.kinvey.com/appdata/kid_SJw3tuDn-/posts?query={}&sort={"postCreateDate": -1}',
            headers: {
                'cache-control': 'no-cache',
                authorization: configFile.kinveyAuthorization
            }
        };

        this.data.users.db(options, function (error, response, body) {
            if (error) throw new Error(error);

            var requestResponse = JSON.parse(body);            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({data: requestResponse}));
            res.end();
        });
    }

    getComments(req, res) {
        var options = {
            method: 'GET',
            url: 'https://baas.kinvey.com/appdata/kid_SJw3tuDn-/comments?query={}&sort={"commentCreateDate": -1}',
            headers: {
                'cache-control': 'no-cache',
                authorization: configFile.kinveyAuthorization
            }
        };

        this.data.users.db(options, function (error, response, body) {
            if (error) throw new Error(error);

            var requestResponse = JSON.parse(body);            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({data: requestResponse}));
            res.end();
        });
    }

    createPost(req, res) {
        const bodyPost = req.body;        
        var options = {
            method: 'POST',
            url: 'https://baas.kinvey.com/appdata/kid_SJw3tuDn-/posts',
            headers: {
                'cache-control': 'no-cache',
                authorization: configFile.kinveyAuthorization,
                'content-type': 'application/json'
            },
            body: { 
                postUser: bodyPost.username, 
                postCreateDate: new Date(Date.now()),
                postTitle: bodyPost.title,
                postDescription: bodyPost.description
            },
            json: true
        };

        this.data.users.db(options, function (error, response, body) {
            if (error) throw new Error(error);

            var requestResponse = body;            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({data: requestResponse}));
            res.end();
        });
    }

    createComment(req, res) {
        const bodyPost = req.body;        
        var options = {
            method: 'POST',
            url: 'https://baas.kinvey.com/appdata/kid_SJw3tuDn-/comments',
            headers: {
                'cache-control': 'no-cache',
                authorization: configFile.kinveyAuthorization,
                'content-type': 'application/json'
            },
            body: { 
                commentUser: bodyPost.commentUser, 
                commentCreateDate: new Date(Date.now()),
                commentDescription: bodyPost.commentDescription,
                postId: bodyPost.postId
            },
            json: true
        };

        this.data.users.db(options, function (error, response, body) {
            if (error) throw new Error(error);

            var requestResponse = body;            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({data: requestResponse}));
            res.end();
        });
    }
}

const init = (data) => {
    return new BlogController(data);
};

module.exports = { init };