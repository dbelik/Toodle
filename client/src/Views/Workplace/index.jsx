import React from 'react';
import Peer from "peerjs";

export default function Workplace() {
    const peer = new Peer({
        host: location.hostname,
        port: location.port || (location.protocol === 'https:' ? 443 : 80),
        path: "/peerjs"
    });
}