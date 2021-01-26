
function Admin(){
    const adm = JSON.parse(localStorage.getItem("User"));
    return(
        <h3>Olá, {adm.name}</h3>
    )
}
export default Admin;