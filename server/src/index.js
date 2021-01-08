require("dotenv").config();

const express = require('express');
const https = require('https');
const fs = require("fs");
const path = require("path");
const peer = require("peer");

const constants = require("./constants");

initAll();

function initAll() {
    initApp();
}

function initApp() {
    const app = express();

    const server = https.createServer(createCredentials(), app);
    server.listen(443, () => console.log('listening'));

    app.use("/peerjs", peer.ExpressPeerServer(server, { debug: true }));
}

function createCredentials() {
    return {
        key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem')),
        passphrase: constants.passphrase
    };
}