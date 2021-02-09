import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import Imagem from '../../assets/Logo.png';

import api from '../../services/api'

import './styles.css';

function Login(){
    const [userName, setuserName] = useState('');
    const [passwd, setPasswd] = useState('');
    const history = useHistory();
    
    async function handleLogin(event){
        event.preventDefault();
        let response = {};
        const data = {
            userName, 
            passwd
        }
        console.log(data)
        try{
            response = await api.post("/", data);
            console.log(response);
        } catch (err){
            console.log('não deu')
        }
        if(response.status === 200){
            localStorage.setItem("User", JSON.stringify(response.data));
            if(response.data.admin === true) return (history.push("/admin"));
            else if(response.data.admin === false) return (history.push("/user"));
        }
        else return (history.push("/"));      
    }

    return(
        <div className= "Login">
            <div className="header">
                <img 
                    width = {225}
                    height = {225}
                    align="center"
                    src={Imagem}
                /> 
            </div>
            <div className="form">
                <div>
                    <h2>
                        Login
                    </h2>
                    <form onSubmit={handleLogin}>
                        <input
                            placeholder= "User Name"
                            type= "text"
                            value = {userName}
                            onChange = {e => setuserName(e.target.value)}
                        />
                        
                        <input 
                            placeholder="Password"
                            type = "password"
                            value= {passwd}
                            onChange= { e=> setPasswd(e.target.value)}
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Login;