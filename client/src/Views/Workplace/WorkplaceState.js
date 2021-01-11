import Peer from 'peerjs';

export default function WorkplaceState(setContentCallback) {
    // Methods:
    this._setContentCallback = setContentCallback;

    this.setContent = setContent;

    this.updateContent = updateContent;
    this.sendToPeers = sendToPeers;

    // Fields:
    this.content = "";
    this.peer = createPeer(this);
    
    this.peerIds = [];
}

// Methods.
// - setters
function setContent(content) {
    this.content = content;
    this._setContentCallback(content);
}

// - misc
// updateContent is called when local changes have happened.
function updateContent(content) {
    this.setContent(content);
    this.sendToPeers(content);
}

function sendToPeers(content, excludeConnections = []) {
    for (const connectionId in this.peer.connections) {
        const connections = this.peer.connections[connectionId];
        for (const connection of connections) {
            if (!excludeConnections.includes(connection))
                connection.send(content);
        }
    }
}

function getPeerId(workplace) {
    const search = window.location.search;
    return !search ? null : search.substring(1);
}

// Utilities.
function createPeer(workplace) {
    const peer = new Peer({
        host: "192.168.0.104",
        port: 9000,
        path: "/doc",
        secure: true
    });

    peer.on("open", () => peerOnOpenHandler(workplace));
    peer.on("connection", (connection) => peerOnConnectionHandler(workplace, connection));
    peer.on("disconnected", () => console.log("disconnected"));
    peer.on("error", (error) => peerOnErrorHandler(workplace, error));
    return peer;
}

function send(workplace, data, excludeConnection = undefined) {
    console.log(data);
    workplace.sendToPeers(data, [excludeConnection]);
}

function close(workplace, connection) {
    // Stop tracking of peer that has been disconnected.
    workplace.peerIds.splice(workplace.peerIds.indexOf(connection.peer), 1);
    // Send new peer array to peers.
    setTimeout(() => send(workplace, workplace.peerIds), 10);
}

function receive(workplace, data, connection = undefined) {
    switch (typeof data) {
        case "string": { workplace.setContent(data); break; }
        default: workplace.peerIds = data;
    }
    send(workplace, data, connection);
}

function connect(workplace, id) {
    initConnectionEventHandlers(workplace, workplace.peer.connect(id));
}

function choose(workplace) {
    return workplace.peerIds.length > 0 ? workplace.peerIds[0] : null;
}

// Add sender event handlers.
function initConnectionEventHandlers(workplace, connection) {
    connection.on("open", () => console.log("Connection is open"));
    connection.on("data", (data) => receive(workplace, data, connection));
    connection.on("close", () => connectionCloseHandler(workplace, connection));
    connection.on("disconnected", () => console.log("disconnected"));
}

// Event handlers
function peerOnOpenHandler(workplace) {
    const connectId = getPeerId(workplace);
    if (connectId) connect(workplace, connectId);
}

function peerOnConnectionHandler(workplace, connection) {
    // Keep track of connected peer.
    workplace.peerIds.push(connection.peer);

    connection.on("data", (data) => receive(workplace, data, connection));
    connection.on("close", () => close(workplace, connection, true));
    connection.on("disconnected", () => console.log("disconnected"));

    // Some time has to pass before sending message to the peer.
    setTimeout(() => send(workplace, workplace.peerIds), 10);
}

function peerOnErrorHandler(workplace, error) {
    switch (error.type) {
        case "peer-unavailable": { console.error("Cannot connect to the given peer"); break; }
        default: console.error(error);
    }
}

function connectionCloseHandler(workplace, connection) {
    console.log("close");
    close(workplace, connection);
    connect(workplace, choose(workplace));
}