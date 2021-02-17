/**
 * Arquivo que contém as funções executadas quando o adm faz um acesso ao bd
 */


const dbFunctions = require('../connections/database');
const ObjectId = require('mongodb').ObjectId;

function StringToBoolean(string){
    if(string === "true") return true;
    else return false;
}

async function getUsers(req, res){
    let response = [];
    let counter = null;
    

    try{
        counter = await dbFunctions.client.db("RGBWallet").collection("Usuarios").countDocuments({admin: false});
        response = await dbFunctions.client.db("RGBWallet").collection("Usuarios").find({admin: false}, {projection: {passwd: 0}}).toArray();
    } catch(e){
        console.log(e);
    }
    const data = {counter, response};
    return res.send(data);
}

async function CreateUser(request, response){

    let {name, userName, month, running, week} = request.body;
    

    month = StringToBoolean(month);
    running = StringToBoolean(running);
    week = parseInt(week);

    try{
        await dbFunctions.client.db("RGBWallet").collection("Usuarios").insertOne({
            name, 
            userName,
            passwd: "", 
            month, 
            running, 
            week,
            admin:false,
            saldo: 0
        });
    } catch(err) {console.log(err)}
    

    return response.status(200).send();
}

async function deleteUser(request, response){
    const _id = request.body._id;
    

    try{
        await dbFunctions.client.db("RGBWallet").collection("Usuarios").deleteOne( {_id: ObjectId(_id)} );
        return response.status(200).send();
    } catch (err) { console.log(err)}
}

async function updateUser(request, response){
    const {_id, ...rest} = request.body;

    rest.month = StringToBoolean(rest.month);
    rest.running = StringToBoolean(rest.running);
    rest.week = parseInt(rest.week);

    

    try{
        await dbFunctions.client.db("RGBWallet").collection("Usuarios").updateOne({_id: ObjectId(_id)}, { $set : {...rest} });
        return response.status(200).send();
    } catch (err) { console.log(err) }
}

async function resetSaldo(request, response){

    try{
        await dbFunctions.client.db("RGBWallet").collection("Usuarios").updateMany({admin: false},{ $set : {saldo: 0}});
        return response.status(200).send();
    } catch (err) { console.log(err) }
}

async function increaseSaldo(request, response){
    
    try{
        const users = await dbFunctions.client.db("RGBWallet").collection("Usuarios").find({admin: false});
        users.forEach( async (user) => {
            let taxa = 1;
            if(user.month) taxa += 0.2;
            if(user.running) taxa += 0.1;
            user.saldo += (40 + (5*user.week))*taxa;

            await dbFunctions.client.db("RGBWallet").collection("Usuarios").updateOne({_id: ObjectId(user._id)},{ $set : {saldo: user.saldo}});
        })
        return response.status(200).send();
    } catch(err) { console.log(err) }
    
}
module.exports = {getUsers, CreateUser, deleteUser, updateUser, resetSaldo, increaseSaldo}; 