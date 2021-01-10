const passphrase = process.env.PASSPHRASE;
const port = process.env.PEER_PORT;
const host = process.env.PEER_HOST;
const path = process.env.PEER_PATH;

module.exports = {
    passphrase,
    port,
    host,
    path
};