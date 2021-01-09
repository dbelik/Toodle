import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PrimaryLink from '../../Components/Misc/PrimaryLink';

export default function NotFound() {
    return (
        <Fragment>
            <Helmet>
                <title>Toodle | Not found</title>
            </Helmet>
            
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <h2 className="color-primary"><b>404</b> - not found =(</h2>
                <PrimaryLink href="/">Take me home!</PrimaryLink>
            </div>
        </Fragment>
    );
}