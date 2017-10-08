"use strict"

const async = () => {
    return Promise.resolve();
};

const config = require("../config");

const run = () => {
    return async()
        .then(() => require("../db").init())
        .then((db) => require("../data").init(db))
        .then((data) => require("../application").init(data))
        .then((app) => {
            app.listen(config.port, () =>
                console.log(`Server listening to port: ${config.port}`));
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateData(socket, json, action, id) {
    if (action == "edit" || action == "create") {
        console.log('updateData called');
    }
    socket.broadcast.to('clients').emit('updateData', json, action, id);
}

module.exports = { run };