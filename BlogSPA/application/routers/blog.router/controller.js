
"use strict"

var configFile = require("../../../config");

class BlogController {
    constructor(data) {
        this.data = data;
    }
}

const init = (data) => {
    return new BlogController(data);
};

module.exports = { init };