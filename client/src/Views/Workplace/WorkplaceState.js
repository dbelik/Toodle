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
    peer.on("disconnected", () => peerOnDisconnectedHandler(peer));
    peer.on("error", (error) => peerOnErrorHandler(peer, error));
    return peer;
}

// Add sender event handlers.
function initConnectionEventHandlers(workplace, connection) {
    connection.on("open", () => workplace.peer.connection = connection);
    connection.on("data", (data) => connectionOnDataHandler(workplace, connection, data));
}

// Event handlers
// - receiver
function peerOnOpenHandler(workplace) {
    const connectId = getPeerId();
    if (connectId) initConnectionEventHandlers(workplace, workplace.peer.connect(connectId));
}

function peerOnConnectionHandler(workplace, connection) {
    connection.on("data", (data) => connectionOnDataHandler(workplace, connection, data));
    workplace.peer.connection = connection;
}

function peerOnDisconnectedHandler(peer) {
    peer.connection = null;
}

function peerOnErrorHandler(peer, error) {
    switch (error.type) {
        case "peer-unavailable": { console.error("Cannot connect to the given peer"); break; }
        default: console.error(error);
    }
}

// - sender
function connectionOnDataHandler(workplace, senderConnection, data) {
    workplace.setContent(data)
    sendFurther(workplace, senderConnection, data);
}

function sendFurther(workplace, senderConnection, data) {
    workplace.sendToPeers(data, [senderConnection]);
}