import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Editor from "../../Components/Workspace/Editor";
import Menu from "../../Components/Workspace/Menu";

import Broadcast from "./Broadcast";

function getPeerId(workplace) {
    const search = window.location.search;
    return !search ? null : search.substring(1);
}

export default function Workplace() {
    const [urlId, setUrlId] = useState("");
    const [content, setContent] = useState("");
    const [broadcast, setBroadcast] = useState(null);

    useEffect(() => {
        const broadcast = new Broadcast((data) => {
            if (data.type === "content") setContent(data.data);
        });

        const urlId = getPeerId();
        if (urlId)  {
            broadcast.peer.on("open", () => broadcast.connect(urlId));
            setUrlId(urlId);
        } else {
            broadcast.peer.on("open", () => setUrlId(broadcast.peer.id));
        }

        setBroadcast(broadcast);
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <Menu urlId={urlId} />
            <button onClick={() => console.log(broadcast?.peerIds)}>Peers</button>
            <Editor onChange={(content) => {
                setContent(content);
                broadcast.broadcast(broadcast.format.content(content));
            }} value={content} />
        </HelmetProvider>
    );
}