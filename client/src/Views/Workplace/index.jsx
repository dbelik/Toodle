import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Editor from "../../Components/Workspace/Editor";
import Menu from "../../Components/Workspace/Menu";

import WorkplaceState from "./WorkplaceState";

export default function Workplace() {
    const [_, setContent] = useState("");

    const [workplace, setWorkplace] = useState(null);

    useEffect(() => setWorkplace(new WorkplaceState(setContent)), []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <Menu peer={workplace?.peer} />
            <Editor onChange={(content) => workplace?.updateContent(content)} value={workplace?.content} />
        </HelmetProvider>
    );
}