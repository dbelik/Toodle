import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Editor from "../../Components/Workspace/Editor";

function initWorkplace() {
    const id = getPeerId();
}

function getPeerId() {
    const search = window.location.search;
    return !search ? null : search.substring(1);
}

export default function Workplace() {
    initWorkplace();

    const [content, setContent] = useState("");

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>
            <Editor onChange={setContent} value={content} />
        </HelmetProvider>
    );
}