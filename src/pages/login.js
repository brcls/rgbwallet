import React, {useState} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom';

import api from '../connections/api'
import Admin from './admin'
import User from './user'

function Login(){
    const [name, setName] = useState('');
    const [passwd, setPasswd] = useState('');
    const history = useHistory();
    
    async function handleLogin(event){
        let response = {};
        event.preventDefault();
        const data = {
            name, 
            passwd
        }
        console.log(data)
        try{
            response = await api.post("/", data);
            console.log(response);
        } catch (err){
            console.log('não deu')
        }
        if(response.status != 201){
            localStorage.setItem("User", JSON.stringify(response.data));
            if(parseInt(response.data.admin) === 1) return (history.push("/admin"));
            else if(parseInt(response.data.admin) === 0) return (history.push("/user"));
        }
        else return (history.push("/"));      
    }

    return(
        <div className= "Login">
            <h3>
                login
            </h3>

            <form onSubmit={handleLogin}>
                <p>
                    Name: <input 
                        type= "text"
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                        />
                </p>
                <p>
                    Password: <input 
                        type = "text"
                        value= {passwd}
                        onChange= { e=> setPasswd(e.target.value)}
                        />
                </p>
                <input type= "submit" name= "submit" value= "Submit"/>
            </form>
        </div>

    )
}
export default Login;