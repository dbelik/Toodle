import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Peer from 'peerjs';

import Editor from "../../Components/Workspace/Editor";
import Menu from "../../Components/Workspace/Menu";

// Utilities
function initWorkplace(setPeer, setConnection, setContent) {
    const peer = new Peer({
        host: "192.168.0.104",
        port: 9000,
        path: "/doc",
        secure: true
    });
    initPeerEventHandlers(peer, setConnection, setContent);
    setPeer(peer);
}

function initPeerEventHandlers(peer, setConnection, setContent) {
    peer.on("open", () => peerOnOpenHandler(peer, setConnection, setContent));
    peer.on("connection", (connection) => peerOnConnectionHandler(connection, setConnection, setContent));
    peer.on("disconnected", () => peerOnDisconnectedHandler(peer));
    peer.on("error", (error) => peerOnErrorHandler(peer, error));
}

function initConnectionEventHandlers(peer, connectId, setConnection, setContent) {
    const connect = peer.connect(connectId);
    connect.on("open", () => setConnection(connect));
    connect.on("data", (data) => setContent(data));
}

// Event handlers
// - peer events
function peerOnOpenHandler(peer, setConnection, setContent) {
    const connectId = getPeerId();
    if (connectId) initConnectionEventHandlers(peer, connectId, setConnection, setContent);
}

function peerOnConnectionHandler(connection, setConnection, setContent) {
    // connection.on("open", () => connection.send('hi'));
    connection.on("data", (data) => setContent(data));
    setConnection(connection);
}

function peerOnDisconnectedHandler(peer) {
    console.log("Disconnected");
}

function peerOnErrorHandler(peer, error) {
    switch (error.type) {
        case "peer-unavailable": { console.error("Cannot connect to the given peer"); break; }
        default: console.error(error);
    }
}

// - editor events:
function contentChange(newContent, setContent, connection) {
    setContent(newContent);
    // If connection is open, send data to peers.
    if (connection)
        connection.send(newContent);
}

// Event handler helpers
function getPeerId() {
    const search = window.location.search;
    return !search ? null : search.substring(1);
}

// Component
export default function Workplace() {
    const [content, setContent] = useState("");
    const [peer, setPeer] = useState(null);
    const [connection, setConnection] = useState(null);

    useEffect(() => initWorkplace(setPeer, setConnection, setContent), []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <Menu peer={peer} />
            <Editor onChange={(content) => contentChange(content, setContent, connection)} value={content} />
        </HelmetProvider>
    );
}