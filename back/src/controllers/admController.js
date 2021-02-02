const client = require('../connections/database');
const ObjectId = require('mongodb').ObjectId;

async function getUsers(req, res){
    let response = [];
    let counter = null;
    const id = req.headers.authorization;

    try{
        const admin = await client.db("RGBWallet").collection("Usuarios").findOne({ _id: ObjectId(id)}, {projection:{passwd: 0}});
        if(!admin){
            console.log("Nao achou nada");

            return res.status(400).send();
        }
        else if(!admin.admin){
            console.log("Nao é admin");

            return res.status(400).send();
        }
    } catch(e) {console.log(e)}

    try{
        counter = await client.db('RGBWallet').collection('Usuarios').countDocuments({admin: false});
        response = await client.db('RGBWallet').collection('Usuarios').find({admin: false}, {projection: {passwd: 0}}).toArray();
        console.log(response);
    } catch(e){
        console.log(e);
    }
    const data = {counter, response};
    return res.send(data);
}

async function create(request, response){
    const {name, userName, month, running, week} = request.body;
    const id = request.headers.authorization;

    try{
        const admin = await client.db('RGBWallet').collection('Usuarios').findOne({_id: ObjectId(id)}, {projection:{passwd:0}})
        
        if(!admin){
            console.log("Não achou o Admin.");
            return response.status(400).send();
        }
        else if(!admin.admin){
            console.log("Não é admin.");
            return response.status(400).send();
        }
    } catch (err) { console.log}

    try{
        await client.db('RGBWallet').collection('Usuarios').insertOne({
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

module.exports = {getUsers, create}; 