/**
 * Pagina de login
 */

import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import Imagem from '../../assets/Logo.png';

import api from '../../services/api'

import styles from "./index.module.css";

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
        try{
            response = await api.post("/", data);
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
        <div className= {styles.Login}>
            <div className={styles.header}>
                <img 

                    width = "200px"
                    height = "200px"
                    align="center"
                    src={Imagem}
                    alt="simbolo da ej"
                /> 
            </div>
            <div className={styles.form}>
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