import React from 'react';
import { Router, Switch, Route } from 'react-router';

import browserHistory from "../browserHistory";

import Home from "../Views/Home";
import Workplace from "../Views/Workplace";
import NotFound from "../Views/NotFound";

export default function Routes() {
    return (
        <Router history={browserHistory}>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/workplace/:id?"><Workplace /></Route>
                
                <Route><NotFound /></Route>
            </Switch>
        </Router>
    );
}