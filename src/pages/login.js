import React, {useState} from 'react';
import {Container, Row, Col, Card, Media} from 'react-bootstrap';
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
            <Container>
                <Row>
                    <Col md = {{offset: 4}}>
                    <h1>
                        RGBWallet
                    </h1>
                    </Col>
                </Row>
            </Container>
            
            <Container fluid = "md">
                <Row>
                    <Col lg= "4" md={{offset: 4}}>
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
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
export default Login;