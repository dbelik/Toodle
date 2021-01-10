import React from 'react';

import SimpleButton from '../../Misc/SimpleButton';

function getShareLink(peer) {
    const connectId = getConnectId(peer);
    return `${window.location.protocol}//${window.location.host}/workplace?${connectId}`;
}

async function copyShareLink(peer) {
    const link = getShareLink(peer);
    await navigator.clipboard.writeText(link);
}

function getPeerId() {
    const search = window.location.search;
    return !search ? null : search.substring(1);
}

function getConnectId(peer) {
    const urlId = getPeerId();
    return urlId ? urlId : peer._id;
}

export default function Menu({ peer }) {
    return (
        <ul className="content-container py-2 px-4">
            <li><SimpleButton onClick={() => copyShareLink(peer)}>Share link</SimpleButton></li>
        </ul>
    );
}