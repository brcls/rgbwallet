import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

function CreateUser() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [month, setMonth] = useState('');
    const [running, setRunning] = useState('');
    const [week, setWeek] = useState('');

    const history = useHistory();

    const user = localStorage.getItem('User');

    async function handleNewUser(e) {
       e.preventDefault();

       const data = {
           name,
           userName,
           month,
           running,
           week,
       }

       try{
            await api.post('/admin', data, {
                headers: {
                    Authorization: user._id,
                }
            });

            history.push('/admin');
       }catch(err){
           alert('Erro ao cadastrar caso, tente novamente.');
       }
    }

    return (
        <div className="new-user-container">
            <div className="content">
                    
                <h1>Cadastrar novo user</h1>

                <Link className="back-link" to="/profile/admin">
                    <FiArrowLeft size ={16} color="#E02041" />
                    Voltar para home
                </Link>

                <form onSubmit={handleNewUser}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        placeholder="Nome de usuário"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <p>Vendeu algum projeto no mês?</p>
                    <section>
                        <button className="setValue" type="button" value= {true} onClick={e => setMonth(e.target.value)}>
                            Sim
                        </button>

                        <button className="setValue" type="button" value= {false} onClick={e => setMonth(e.target.value)}>
                            Não
                        </button>
                    </section>
                    
                    <p>Executando algum projeto?</p>
                    <section>
                        <button className="setValue" type="button" value= {true} onClick={e => setRunning(e.target.value)}>
                        Sim
                        </button>

                        <button className="setValue" type="button" value= {false} onClick={e => setRunning(e.target.value)}>
                            Não
                        </button>
                    </section>
                    
                    
                    <input 
                        placeholder="Quantas semanas cumpriu as 10 horas semanais"
                        value={week}
                        onChange={e => setWeek(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>  
    )
}

export default CreateUser;