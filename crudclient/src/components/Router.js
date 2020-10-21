import {Route, Switch} from 'react-router-dom'
import React from 'react';
import Homepage from '../pages/homepage';
import Createpage from '../pages/createpage';
import Resultpage from '../pages/resultpage';

export default function Router() {

    return (
        <Switch>
            <Route path="/" component={Homepage} exact/>
            <Route path="/addstore" component={Createpage} />
            <Route path="/result" component={Resultpage} exact/>
        </Switch>
    )
}