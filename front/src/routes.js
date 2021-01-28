import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import login from './pages/login';
import admin from './pages/admin';
import user from './pages/user';

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