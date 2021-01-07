import React from 'react';

import PrimaryLink from "../../Components/Misc/PrimaryLink";

export default function Home() {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
            <h1 className="color-primary mb-3">Toodle</h1>
            <PrimaryLink href="#">Start texting</PrimaryLink>
        </div>
    );
}