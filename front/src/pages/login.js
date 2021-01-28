import React, {useState} from 'react';
import {Container, Row, Col, Card, Media} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom';

import Imagem from '../images/Logo.png';

import api from '../connections/api'
import Admin from './admin'
import User from './user'
import '../styles/login.css';

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
            <section className="grid header">
                <div className = "item image">
                    <Media>
                        <img 
                        width = {64}
                        height = {64}
                        align="center"
                        src={Imagem}
                        />
                    </Media>
                </div>
                <div className = "item title">
                    <h1>
                        RGBWallet
                    </h1>
                </div>
            </section>
            <section className="grid forms">
                <div className="item form">
                    <Card bg= "dark" text="white" border="primary" width={{width: '18rem'}}>
                        <Card.Header>
                            Login
                        </Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </div>

    )
}
export default Login;