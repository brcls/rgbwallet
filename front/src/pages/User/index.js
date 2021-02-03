import React from "react";
import {  useHistory } from "react-router-dom";
import { FaWallet, FaSignOutAlt } from "react-icons/fa";

import "./styles.css";

export default function Profile() {
    
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("User"));
    

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <div className="pai">
                <div className="content">
                    <h1>
                        <FaWallet size={25}/>
                        <p>Conta</p>
                    </h1>
                    <p1>Saldo disponível</p1>
                    <h2>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(user.saldo) }</h2>
                </div>
                
                <button onClick={handleLogout} type="button">
                    <FaSignOutAlt size={50}/> 
                </button>
            </div>
            
        </div>
    )
}