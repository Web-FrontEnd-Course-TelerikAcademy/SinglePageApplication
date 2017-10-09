"use strict"

const port = 1989;
const sessionSecret = "The higher the faster";
const kinveyOptions = { 
    url: 'https://baas.kinvey.com/',
    headers: {
        "cache-control": 'no-cache',
        "authorization": 'Basic a2lkX1NKdzN0dURuLTo2NDYyZjVjOWVhOWE0NGJiOWMwNmZhMjY2NTVmNjI1Zg=='
    } 
};
const kinveyAuthorization = 'Basic a2lkX1NKdzN0dURuLTo2NDYyZjVjOWVhOWE0NGJiOWMwNmZhMjY2NTVmNjI1Zg==';
const kinveyAppKey = "kid_SJw3tuDn-";
const kinveySecret = "6462f5c9ea9a44bb9c06fa26655f625f";

module.exports = { 
    port,
    sessionSecret,
    kinveyOptions,
    kinveyAppKey,
    kinveySecret,
    kinveyAuthorization
};
