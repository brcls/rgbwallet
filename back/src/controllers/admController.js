const dbFunctions = require('../connections/database');
const ObjectId = require('mongodb').ObjectId;

async function getUsers(req, res){
    let response = [];
    let counter = null;
    const id = req.headers.authorization;

    const verification = dbFunctions.verifyAdmin(id);

    if(!verification) return res.status(400).send();

    try{
        counter = await dbFunctions.client.db('RGBWallet').collection('Usuarios').countDocuments({admin: false});
        response = await dbFunctions.client.db('RGBWallet').collection('Usuarios').find({admin: false}, {projection: {passwd: 0}}).toArray();
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

    const verification = dbFunctions.verifyAdmin(id);

    if(!verification) return res.status(400).send();

    try{
        await dbFunctions.client.db('RGBWallet').collection('Usuarios').insertOne({
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