import Peer from "peerjs";

import DataFormat from "./DataFormat";

export default class Broadcast {
    constructor(onData = null) {
        // Fields.
        this.peer = new Peer({
            host: "192.168.0.104",
            port: 9000,
            path: "/doc",
            secure: true
        });
        this.inConnections = [];
        this.outConnections = [];
        this.peerIds = [];

        this.format = new DataFormat();
        this._onData = onData; // Method that's called when data is received.

        // Initialize broadcast.
        this._bindOnOpen();
    }
    
    // Operations on connections.
    // Send data to a specific peer.
    send(connection, data) {
        connection.send(data);
    }

    // Send data to all (not excluded) peers.
    broadcast(content, exclude = []) {
        this.inConnections.forEach((connection) => { if (!exclude.includes(connection)) this.send(connection, content); });
        this.outConnections.forEach((connection) => { if (!exclude.includes(connection)) this.send(connection, content); });
    }

    // Choose next potential outcomming peer.
    choose() {
        if (this.peerIds.length > 1) { // At least two peers must be in the network.
            return this.peerIds[0] !== this.peer.id ? this.peerIds[0] : null;
        }
    }

    // Connect to a peer.
    connect(id) {
        const connection = this.peer.connect(id);
        connection.on("open", () => {
            this._bindOnData(connection);
            this._bindOnClose(connection, this.outConnections);
            this._bindOnCloseChoose(connection);

            this.outConnections.push(connection);
            this.peerIds.push(connection.peer);

            this.broadcast(this.format.connection(connection.id), [connection]);
        });
    }

    // Event bindings.
    _bindOnOpen() {
        this.peer.on("open", () => {
            this.peerIds.push(this.peer.id);

            this._bindOnError();
            this._bindOnConnection();
            this._bindOnDisconnect();
        })
    }

    _bindOnError() {
        this.peer.on("error", (error) => {
            switch (error.type) {
                case "peer-unavailable": { console.error("peer-unavailable"); break; }
                default: { console.error(error); break; }
            }
        });
    }

    _bindOnConnection() {
        this.peer.on("connection", (connection) => {
            this._bindOnData(connection);
            this._bindOnClose(connection, this.inConnections);
            this._bindOnOpenConnection(connection);

            this.inConnections.push(connection);
            this.peerIds.push(connection.peer);

            this.broadcast(this.format.connection(connection.peer), [connection]);
        });
    }

    _bindOnData(connection) {
        connection.on("data", (data) => {
            if (this._onData) this._onData(data);

            switch (data.type) {
                case "close": { this.peerIds.splice(this.peerIds.indexOf(data.data), 1); break; }
                case "connection": { this.peerIds.push(data.data); break; }
                case "table": { this.peerIds = data.data; return; } // Don't broadcast peers table.

                default: { console.log("Data has been received: ", data); }
            }

            this.broadcast(data, [connection]);
        })
    }

    _bindOnClose(connection, excludeFrom) {
        connection.on("close", () => {
            if (excludeFrom) excludeFrom.splice(excludeFrom.indexOf(connection), 1);
            this.peerIds.splice(this.peerIds.indexOf(connection.peer), 1);
            this.broadcast(this.format.close(connection.peer), [connection]);

            console.log(this.peerIds);
        })
    }

    _bindOnCloseChoose(connection) {
        connection.on("close", () => {
            const peer = this.choose();
            if (!peer) return;
            this.connect(peer);
        });
    }

    _bindOnOpenConnection(connection) {
        connection.on("open", () => {
            this.send(connection, this.format.table(this.peerIds));
        });
    }

    _bindOnDisconnect() {
        this.peer.on("disconnected", () => {
            alert("The server that was used to establish communication between you and your peer has been outaged.");
        });
    }
}