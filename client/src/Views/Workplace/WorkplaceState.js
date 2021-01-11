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

function getPeerId() {
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
    peer.on("disconnected", () => peerOnDisconnectedHandler(workplace));
    peer.on("close", () => console.log("Close"));
    peer.on("error", (error) => peerOnErrorHandler(workplace, error));
    return peer;
}

function send(workplace, data, senderConnection = undefined) {
    console.log(data);
    workplace.sendToPeers(data, [senderConnection]);
}

function close(workplace, connection) {
    console.log("close");
    workplace.peerIds.splice(workplace.peerIds.indexOf(connection.peer), 1);
    send(workplace, workplace.peerIds);
}

function receive(workplace, data, connection = undefined) {
    console.log(data);
    send(workplace, data, connection);
}

// Add sender event handlers.
function initConnectionEventHandlers(workplace, connection) {
    connection.on("open", () => console.log("Connection is open"));
    connection.on("data", (data) => receive(workplace, data, connection));
    connection.on("close", () => console.log("close"));
}

// Event handlers
// - receiver
function peerOnOpenHandler(workplace) {
    const connectId = getPeerId();
    if (connectId) initConnectionEventHandlers(workplace, workplace.peer.connect(connectId));
}

function peerOnConnectionHandler(workplace, connection) {
    // Keep track of connected peer.
    workplace.peerIds.push(connection.peer);

    connection.on("data", (data) => receive(workplace, data, connection));
    connection.on("close", () => close(workplace, connection));

    // Some time has to pass before sending message to the peer.
    setTimeout(() => send(workplace, workplace.peerIds), 1);
}

function peerOnDisconnectedHandler(workplace) {
    console.log("Disconnect")
}

function peerOnErrorHandler(workplace, error) {
    switch (error.type) {
        case "peer-unavailable": { console.error("Cannot connect to the given peer"); break; }
        default: console.error(error);
    }
}