function User(){
    const user = JSON.parse(localStorage.getItem("User"));
    return (
        <h3>Olá, {user.name}. Seu saldo é de {user.saldo}</h3>
    )
}

export default User;