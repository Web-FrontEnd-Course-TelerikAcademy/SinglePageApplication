"use strict"

const port = 1989;
const sessionSecret = "The higher the faster";
const kinveyOptions = { 
    url: 'https://baas.kinvey.com/',
    headers: {
        "Content-Type": "application/json",
        "cache-control": 'no-cache',
        "Authorization": 'Basic a2lkX1NKdzN0dURuLTo4ZDc2NWM3N2E1NDA0YWM0ODM3MTM1ZTU4ZjI4MTNlOQ==',
        "X-Kinvey-API-Version": 3
    } 
};

module.exports = { 
    port,
    sessionSecret,
    kinveyOptions
};
