import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import { FaSignOutAlt } from "react-icons/fa";
import "./styles.css";


function Admin(){
    const history = useHistory();
    const[users, setUsers] = useState([]);
    const adm = JSON.parse(localStorage.getItem("User"));
    
    async function getUsers(){
        try{
            const response = await api.get("/admin", {
                headers: { Authorization: adm._id}
            });
            setUsers(response.data.response);
        } catch(err) { console.log(err) }
    }

    function handleRegistration(){
        return history.push("/admin/new");
    } 

    function handleLogout(){
        localStorage.clear();
        return history.push("/");
    }

    useEffect(async () =>{
        if(adm === null) return history.push("chome://new-tab-page/");
        else await getUsers() 
    },[]);
    
    
    return(
        <div className="admin">
            <div className="header-admin">
                <h2>
                    Olá, {adm.name}
                </h2>
                <div className="buttons">
                    <button id="register" onClick={handleRegistration}> ADD USER</button>
                    <button id="logout" onClick={handleLogout}> <FaSignOutAlt size= "2rem"/> </button>
                </div>
               
            </div>
            <div className="users">
                <ul className="table">
                    {users.map(user => {
                        return(
                            <li>
                                <div className="user">
                                    <h4>{user.name}</h4>
                                    <h5>User Name: {user.userName}</h5>
                                    <h5>Saldo: {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(user.saldo) }</h5>
                                    {user.running ? 
                                        <h5>Executando</h5>
                                        : <h5> Não está Executando</h5>
                                    }
                                    {user.month ?
                                        <h5>Vendeu projeto no mês</h5>
                                        : <h5> Não vendeu projeto no mês</h5>
                                    }
                                    <h5>Semanas com 10 horas: {user.week}</h5>
                                </div>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}
export default Admin;