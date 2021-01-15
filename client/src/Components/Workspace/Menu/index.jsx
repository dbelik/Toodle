import React from 'react';

import UsersList from '../UsersList';
import SimpleButton from '../../Misc/SimpleButton';
import MenuToggle from '../../Misc/MenuToggle';

async function copyShareLink(urlId) {
    const link = `${window.location.protocol}//${window.location.host}/workplace?${urlId}`;
    await navigator.clipboard.writeText(link);
}

export default function Menu({ urlId, room }) {
    return (
        <div className="pt-2 px-3 fixed h-screen top-0 right-0 z-20 w-16">
            <MenuToggle className="mb-5" />
            <ul>
                <li className="text-center"><SimpleButton onClick={() => copyShareLink(urlId)}>Share</SimpleButton></li>
                <li><UsersList room={room} showNames={false} /></li>
            </ul>
        </div>
    );
}