const dbFunctions = require('../connections/database');

async function auth(req, res, next){
    try{
        const id = req.headers.authorization;

        const verification = await dbFunctions.verifyAdmin(id);
        if(!verification) return res.status(401).send();

        else next();
    } catch(err) { console.log(err) }
}

module.exports = auth;