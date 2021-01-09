import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Peer from 'peerjs';

import Editor from "../../Components/Workspace/Editor";
import Menu from "../../Components/Workspace/Menu";

function createPeer() {
    return new Peer();
}

export default function Workplace() {
    const [content, setContent] = useState("");
    const [peer] = useState(createPeer());

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