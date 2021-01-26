import React, { useState } from 'react';

import UsersList from '../UsersList';
import SimpleButton from '../../Misc/SimpleButton';
import MenuToggle from '../../Misc/MenuToggle';

async function copyShareLink(urlId) {
    const link = `${window.location.protocol}//${window.location.host}/workplace?${urlId}`;
    await navigator.clipboard.writeText(link);
}

function ToggleMenu(active, setActive) {
    setActive(!active);
    const menu = document.getElementById("menu");
    if (!active) menu.style.transform = "translateX(0)";
    else menu.style.transform = "translateX(77%)";
}

export default function Menu({ urlId, room }) {
    const [active, setActive] = useState(false);

    return (
        <div id="menu" className="bg-white pt-2 px-2 fixed h-screen top-0 right-0 z-20 w-64 flex flex-col items-start overflow-auto" style={{
            transform: "translateX(77%)",
            transition: "var(--fast)"
        }}>
            <MenuToggle className="mb-5 ml-1" onClick={() => ToggleMenu(active, setActive)} activated={active} />
            <ul>
                <li className="text-left"><SimpleButton onClick={() => copyShareLink(urlId)}>Share</SimpleButton></li>
                <li className="ml-1"><UsersList room={room} showNames={false} /></li>
            </ul>
        </div>
    );
}