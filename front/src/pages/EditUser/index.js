/**
 * Pagina de Edição do Usuário
 */

import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

function EditUSer() {
    const adm = JSON.parse(localStorage.getItem('User'));
    const user = JSON.parse(localStorage.getItem('userEdited'));
    const [name, setName] = useState(user.name);
    const [userName, setUserName] = useState(user.userName);
    const [month, setMonth] = useState(user.month);
    const [running, setRunning] = useState(user.running);
    const [week, setWeek] = useState(user.week);
    const [botaoApertadoSim, setBotaoApertadoSim] = useState(false);
    const [botaoApertadoNao, setBotaoApertadoNao] = useState(false);
    const [botaoApertadoSim2, setBotaoApertadoSim2] = useState(false);
    const [botaoApertadoNao2, setBotaoApertadoNao2] = useState(false);
    const history = useHistory();


    async function handleEditedUser(e) {
       e.preventDefault();

       const data = {
           _id: user._id,
           name,
           userName,
           month,
           running,
           week,
       }

       try{
            await api.put('/admin/user',data, {
                headers: {
                    Authorization: adm._id,
                }
            });
            localStorage.removeItem('userEdited')
            return history.push('/admin');
       }catch(err){
           alert('Erro ao cadastrar caso, tente novamente.');
       }
    }

    function handleLeavePage(){
        localStorage.removeItem('userEdited');
        history.push('/admin');
    }

    return (
        <div className="edit-user-container">
            <div className="content">
                

                <h1>Editar Usuário</h1>

                <button className="back-link" onClick={handleLeavePage}>
                    <FiArrowLeft size ={16} color="#E02041" />
                    Voltar para home
                </button>

                <form onSubmit={handleEditedUser}>
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
                        <button className="setValue" style={{backgroundColor: botaoApertadoSim ? 'green': '#b6b6b6'}} type="button" value= {true} onClick={e => {setMonth(e.target.value); setBotaoApertadoSim(true); setBotaoApertadoNao(false)}}>
                            Sim
                        </button>
                        <button className="setValue" style={{backgroundColor: botaoApertadoNao ? 'red': '#b6b6b6'}} type="button" value= {false} onClick={e => {setMonth(e.target.value); setBotaoApertadoNao(true); setBotaoApertadoSim(false)}}>
                            Não
                        </button>
                    </section>
                    
                    <p>Executando algum projeto?</p>
                    <section>
                        <button className="setValue" style={{backgroundColor: botaoApertadoSim2 ? 'green': '#b6b6b6'}} type="button" value= {true} onClick={e => {setRunning(e.target.value); setBotaoApertadoSim2(true); setBotaoApertadoNao2(false)}}>
                            Sim
                        </button>

                        <button className="setValue" style={{backgroundColor: botaoApertadoNao2 ? 'red': '#b6b6b6'}} type="button" value= {false} onClick={e => {setRunning(e.target.value); setBotaoApertadoNao2(true); setBotaoApertadoSim2(false)}}>
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

export default EditUSer;