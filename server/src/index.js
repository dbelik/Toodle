require("dotenv").config();

const fs = require("fs");
const path = require("path");
const peer = require("peer");

const constants = require("./constants");

initAll();

function initAll() {
    const server = peer.PeerServer({
        host: constants.host,
        port: constants.port,
        path: constants.path,
        ssl: createCredentials()
    }, () => console.log(`Server is running on "https://${constants.host}:${constants.port}".`));
    server.on("connection", (client) => console.log("connect - " + client.id));
    server.on("disconnect", (client) => console.log("disconnect - " + client.id));
}

function createCredentials() {
    return {
        key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem')),
        passphrase: constants.passphrase
    };
}