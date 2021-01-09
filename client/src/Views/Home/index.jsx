import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import PrimaryLink from "../../Components/Misc/PrimaryLink";

export default function Home() {
    return (
        <Fragment>
            <Helmet>
                <title>Toodle | Home</title>
            </Helmet>

            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <h1 className="color-primary">Toodle</h1>
                <PrimaryLink href="/workplace">Start working</PrimaryLink>
            </div>
        </Fragment>
    );
}