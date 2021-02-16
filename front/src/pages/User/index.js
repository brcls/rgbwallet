/**
 * Pagina de Saldo de Usuário
 */

import React from "react";
import {  useHistory } from "react-router-dom";
import { FaWallet, FaSignOutAlt } from "react-icons/fa";

import styles from "./index.module.css";

export default function Profile() {
    
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("User"));
    

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className={styles.profile_container}>
            
            <div className={styles.header}>
                <button onClick={handleLogout} type="button">
                    <FaSignOutAlt size={30}/> 
                </button>
            </div>

            <div className={styles.content}>
                <h1>
                    <FaWallet size={25}/>
                    <p>Conta</p>
                </h1>
                <p1>Saldo disponível</p1>
                <h2>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(user.saldo) }</h2>
            </div>
        </div>
    )
}