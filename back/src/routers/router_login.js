const { json } = require('body-parser');
const express = require('express');
const client = require('../connections/database');

const router = express.Router();

async function fetchdata(myobj){
    try{
        const result = await client.db("RGBWallet").collection("Usuarios").findOne(myobj);
        console.log(result)   
        return result;
    } catch(e){
        console.log(e);
        console.log("Talvez nao achei nada")
        return null;
    }
}

router.post("/", async (req, res) => {
    const {name, passwd} = req.body;
    const myobj = {name, passwd};
    let result = {};
    console.log(myobj);
    try{

        result = await fetchdata(myobj);
        console.log("peguei os dados")
    } catch (err){
        console.log(err)
    }
    if(result == null) return res.status(201).send(result);
    else return res.status(200).send(result);
})


module.exports = router;