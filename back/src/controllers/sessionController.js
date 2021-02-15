/**
 * Arquivo que contém as funções de sessão, que no caso é apenas a de login
 */

const dbFunctions = require('../connections/database');

async function login(req, res){
    const {userName, passwd} = req.body;
    const myobj = {userName, passwd};
    let result = {};
    
    try{
        result = await dbFunctions.client.db("RGBWallet").collection("Usuarios").findOne(myobj, {projection:{passwd:0}});
    } catch (err){
        console.log(err)
    }
    if(result === null) return res.status(400).send();
    else return res.status(200).send(result);
}


module.exports= {login};