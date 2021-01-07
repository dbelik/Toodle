import React from 'react';
import { Router, Switch, Route } from 'react-router';

import browserHistory from "../browserHistory";

import Home from "../Views/Home";

export default function Routes() {
    return (
        <Router history={browserHistory}>
            <Switch>
                <Route exact path="/" render={Home} />
            </Switch>
        </Router>
    );
}