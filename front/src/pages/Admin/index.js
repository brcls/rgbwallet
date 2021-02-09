import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import { FaSignOutAlt , FaTrash , FaPencilAlt, FaCreativeCommonsZero, FaUserPlus, FaHandHoldingUsd, FaCalendarCheck, FaLaptopCode} from "react-icons/fa";
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

    async function handleDelete(_id){
        try{
                await api.delete("/admin", {
                headers: { Authorization: adm._id } , data :  {_id: _id} 
            })

            setUsers(users.filter( user => user._id !== _id));
        } catch (err) {console.log(err)}
    }

    async function handleResetAllBalance(){
        try{
                await api.put("/admin/zerarsaldo", {
                headers: { Authorization: adm._id } 
            })

            setUsers(users.map( user => {
                user.saldo = 0;
                return user;
            }));
        } catch (err) {console.log(err)}
    }

    async function handleIncreaseBalance(){
        try{
                await api.put("/admin/aumentarsaldo", {
                headers: { Authorization: adm._id }
            })

            setUsers(users.map( user => {
                let taxa = 1;
                if(user.month) taxa += 0.2;
                if(user.running) taxa += 0.1;
                user.saldo += (40 + (5*user.week))*taxa;
                return user;
            }));
        } catch (err) {console.log(err)}
    }

    function handleEdit(user){
        localStorage.setItem("userEdited", JSON.stringify(user));
        history.push("/admin/editUser");
    }

    useEffect(async () =>{
        if(adm === null) return history.push("chome://new-tab-page/");
        else await getUsers() 
    },[]);
    
    
    return(
        <div className="admin">
            <div className="header-admin">
                <strong>
                    Olá, {adm.name}
                </strong>
                <div className="buttons">
                    <button id="register" onClick={handleRegistration}> <FaUserPlus size= "2rem"/> </button>
                    <button id="reset" onClick={handleResetAllBalance}> <FaCreativeCommonsZero size= "2rem"/></button>
                    <button id="increase" onClick={handleIncreaseBalance}><FaHandHoldingUsd size= "2rem"/></button>
                    <button id="logout" onClick={handleLogout}> <FaSignOutAlt size= "2rem"/> </button>
                </div>

            </div>
            <div className="users">
                <ul className="table">
                    {users.map(user => {
                        return(
                            <li>
                                <div className="user">
                                    <div className="info">
                                        <h4><strong>{user.name}</strong></h4>
                                        <h5><strong>User:</strong> {user.userName}</h5>
                                        <h5><strong>Saldo:</strong> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(user.saldo) }</h5>
                                        <h5><strong>Semanas com 10 horas:</strong> {user.week}</h5>
                                        <div className="icons">
                                            {user.running ? 
                                                <h5 className="executando"><FaLaptopCode color="green" size="2rem"/></h5>
                                                : <h5 className="executando"><FaLaptopCode color="red" size="2rem"/></h5>
                                            }
                                            {user.month ?
                                                <h5 className="mes"><FaCalendarCheck color="green" size="2rem"/></h5>
                                                : <h5 className="mes"> <FaCalendarCheck color="red" size="2rem"/></h5>
                                            }
                                        </div>
                                    </div>
                                    <div className="user-buttons">
                                        <button id="edit" onClick={ ()=>{handleEdit(user)} }>
                                            <FaPencilAlt size="1rem" />
                                        </button>
                                        <button id="trash" onClick={ ()=>{handleDelete(user._id)} }>
                                            <FaTrash size="1rem" />
                                        </button>
                                    </div>
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