import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Peer from 'peerjs';

import Editor from "../../Components/Workspace/Editor";
import Menu from "../../Components/Workspace/Menu";

// Utilities
function createPeer() {
    const peer = new Peer({
        host: "localhost",
        port: 9000,
        path: "/doc",
        secure: true
    });
    initPeerEventHandlers(peer);
    return peer;
}

function initPeerEventHandlers(peer) {
    peer.on("open", () => peerOnOpenHandler(peer));
    peer.on("connection", () => peerOnConnectionHandler(peer));
    peer.on("disconnected", () => peerOnDisconnectedHandler(peer));
    peer.on("error", (error) => peerOnErrorHandler(peer, error));
}

// Event handlers
function peerOnOpenHandler(peer) {
    console.log(`Peer is open with id - ${peer.id}`);
    const connectId = getPeerId();
    if (connectId) initConnectionEventHandlers(peer, connectId);
}

function initConnectionEventHandlers(peer, connectId) {
    const connect = peer.connect(connectId);
    connect.on("open", () => console.log('Open'));
}

function peerOnConnectionHandler(peer) {
    console.log("Connection established");
}

function peerOnDisconnectedHandler(peer) {
    console.log("Disconnected");
}

function peerOnErrorHandler(peer, error) {
    console.log(error);
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

    useEffect(() => setPeer(createPeer()), []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <Menu peer={peer} />
            <Editor onChange={setContent} value={content} />
        </HelmetProvider>
    );
}