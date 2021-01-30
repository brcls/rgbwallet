import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import login from './pages/Login';
import admin from './pages/Admin';
import user from './pages/User';

function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={login}/>
                <Route exact path='/admin' component={admin}/>
                <Route exact path='/user' component={user}/>
            </Switch>
        </Router>
    )
}

export default Routes;