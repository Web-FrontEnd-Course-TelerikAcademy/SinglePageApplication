"use strict"

const request = require("request");
const init = () => {
    return request;
};

module.exports = { init };