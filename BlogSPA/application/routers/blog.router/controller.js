
"use strict"

var configFile = require("../../../config");

class BlogController {
    constructor(data) {
        this.data = data;
    }

    getPosts(req, res) {
        var options = {
            method: 'GET',
            url: 'https://baas.kinvey.com/appdata/kid_SJw3tuDn-/posts',
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
}

const init = (data) => {
    return new BlogController(data);
};

module.exports = { init };