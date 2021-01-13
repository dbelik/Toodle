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
    send(connection, data) {
        connection.send(data);
    }

    broadcast(content, exclude = []) {
        this.inConnections.forEach((connection) => { if (!exclude.includes(connection)) this.send(connection, content); });
        this.outConnections.forEach((connection) => { if (!exclude.includes(connection)) this.send(connection, content); });
    }

    connect(id) {
        const connection = this.peer.connect(id);
        connection.on("open", () => {
            this._bindOnData(connection);
            this._bindOnClose(connection, this.outConnections);

            this.outConnections.push(connection);
            this.peerIds.push(connection.peer);

            this.broadcast(this.format.connection(connection.id), [connection]);
        });
    }

    // Event bindings.
    _bindOnOpen() {
        this.peer.on("open", () => {
            this._bindOnError();
            this._bindOnConnection();
            this._bindOnDisconnect();
        })
    }

    _bindOnError() {
        this.peer.on("error", (error) => {
            console.error(error);
        });
    }

    _bindOnConnection() {
        this.peer.on("connection", (connection) => {
            this._bindOnData(connection);
            this._bindOnClose(connection, this.inConnections);

            this.inConnections.push(connection);
            this.peerIds.push(connection.peer);
            
            this.broadcast(this.format.connection(connection.peer), [connection]);
        });
    }

    _bindOnData(connection) {
        connection.on("data", (data) => {
            if (this._onData) this._onData(data);
            
            switch (data.type) {
                case "close": { this.peerIds.splice(this.peerIds.indexOf(data.data)); break; }
                case "connection": { this.peerIds.push(data.data); break; }
            }

            this.broadcast(data, [connection]);
        })
    }

    _bindOnClose(connection, excludeFrom) {
        connection.on("close", () => {
            if (excludeFrom) excludeFrom.splice(excludeFrom.indexOf(connection), 1);
            this.broadcast(this.format.close(connection.peer), [connection]);
        })
    }

    _bindOnDisconnect() {
        this.peer.on("disconnected", () => {
            alert("The server that was used to establish communication between you and your peer has been outaged.");
        });
    }
}