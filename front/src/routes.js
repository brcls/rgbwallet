import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import login from './pages/Login';
import admin from './pages/Admin';
import user from './pages/User';
import CreateUser from './pages/NewUser';
import EditUser from './pages/EditUser';

function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={login}/>
                <Route exact path='/admin' component={admin}/>
                <Route exact path='/user' component={user}/>
                <Route exact path='/admin/new' component={CreateUser}/>
                <Route exact path='/admin/editUser' component={EditUser}/>
            </Switch>
        </Router>
    )
}

export default Routes;