/**
 * Arquivo que contém as funções de sessão, que no caso é apenas a de login
 */

const dbFunctions = require('../connections/database');
const bcrypt = require('bcryptjs');

async function login(req, res){
    const {userName, passwd} = req.body;
    let result = {};
    
    try{
        result = await dbFunctions.client.db("RGBWallet").collection("Usuarios").findOne({userName});
        if(!result) return res.status(400).send();

        if(result.admin){
            const verification = await bcrypt.compare(passwd, result.passwd);
            if(!verification) return res.status(400).send();
        }

    } catch (err){
        console.log(err)
    }

    const {passwd: Password, ...rest} = result
    if(result === null) return res.status(400).send();
    else return res.status(200).send(rest);
}


module.exports= {login};