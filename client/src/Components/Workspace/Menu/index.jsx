import React from 'react';

import SimpleButton from '../../Misc/SimpleButton';

async function copyShareLink(urlId) {
    const link = `${window.location.protocol}//${window.location.host}/workplace?${urlId}`;
    await navigator.clipboard.writeText(link);
}

export default function Menu({ urlId }) {
    return (
        <ul className="content-container py-2 px-4">
            <li><SimpleButton onClick={() => copyShareLink(urlId)}>Share link</SimpleButton></li>
        </ul>
    );
}