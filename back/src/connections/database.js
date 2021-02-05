
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gabriel:123456ga.@gvrcluster.u6svv.mongodb.net/RGBWallet?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 });
const ObjectId = require('mongodb').ObjectID;
client.connect();

async function verifyAdmin(id){
    try{
        const admin = await client.db("RGBWallet").collection("Usuarios").findOne({ _id: ObjectId(id)}, {projection:{passwd: 0}});
        if(!admin){
            console.log("Nao achou nada");

            return false;
        }
        else if(!admin.admin){
            console.log("Nao é admin");

            return false;
        }
    } catch(e) {console.log(e)}
    return true;
}
module.exports = {client, verifyAdmin};
