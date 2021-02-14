import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import login from './pages/Login';
import admin from './pages/Admin';
import user from './pages/User';
import CreateUser from './pages/NewUser';
import EditUser from './pages/EditUser';

const isLogged = ()=>{
    let usuario = localStorage.getItem("User");
    if(!usuario) return false;
    
    return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        const user = isLogged();
        if (!user) {
          return (
            <Redirect
              to={{ pathname: '/', state: { from: props.location } }}
            />
          );
        }
        return <Component />;
      }}
    />
  );

function Routes(){
    

    return(
        <Router>
            <Switch>
                <Route exact path='/' component={login}/>
                <PrivateRoute exact path='/admin' component={admin}/>
                <Route exact path='/user' component={user}/>
                <PrivateRoute exact path='/admin/new' component={CreateUser}/>
                <PrivateRoute exact path='/admin/editUser' component={EditUser}/>
            </Switch>
        </Router>
    )
}

export default Routes;