const dbFunctions = require('../connections/database');
const ObjectId = require('mongodb').ObjectId;

function StringToBoolean(string){
    if(string === "true") return true;
    else return false;
}

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

    month = StringToBoolean(month);
    running = StringToBoolean(running);
    week = parseInt(week);

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

async function deleteUser(request, response){
    const _id = request.body._id;
    const authorization = request.headers.authorization;

    const verification = dbFunctions.verifyAdmin(authorization);

    if(!verification) return response.status(400).send();

    try{
        await dbFunctions.client.db('RGBWallet').collection('Usuarios').deleteOne( {_id: ObjectId(_id)} );
        return response.status(200).send();
    } catch (err) { console.log(err)}
}

async function updateUser(request, response){
    const {_id, ...rest} = request.body;
    const authorization = request.headers.authorization;
    console.log({...rest});

    rest.month = StringToBoolean(rest.month);
    rest.running = StringToBoolean(rest.running);
    rest.week = parseInt(rest.week);


    const verification = dbFunctions.verifyAdmin(authorization);

    if(!verification) return response.status(400).send();

    try{
        await dbFunctions.client.db("RGBWallet").collection("Usuarios").updateOne({_id: ObjectId(_id)}, { $set : {...rest} });
        return response.status(200).send();
    } catch (err) { console.log(err) }
}

async function resetSaldo(request, response){
    const authorization = request.headers.authorization;

    const verification = dbFunctions.verifyAdmin(authorization);

    if(!verification) return response.status(400).send();

    try{
        await dbFunctions.client.db("RGBWallet").collection("Usuarios").updateMany({admin: false},{ $set : {saldo: 0}});
        return response.status(200).send();
    } catch (err) { console.log(err) }
}

async function increaseSaldo(request, response){
    const authorization = request.headers.authorization;

    const verification = dbFunctions.verifyAdmin(authorization);
    if(!verification) return response.status(400).send();

    try{
        const users = await dbFunctions.client.db('RGBWallet').collection('Usuarios').find({admin: false});
        users.forEach( async (user) => {
            user.saldo += (40 + (5*user.week))*(1+(user.month && 0,2) + (user.running && 0,1));
            await dbFunctions.client.db('RGBWallet').collection('Usuarios').updateOne({_id: ObjectId(user._id)},{ $set : {saldo: user.saldo}});
        })
        return response.status(200).send();
    } catch(err) { console.log(err) }
    
}
module.exports = {getUsers, create, deleteUser, updateUser, resetSaldo, increaseSaldo}; 