/**
 * Arquivo responsável por realizar as configurações iniciais do BD
 */


 /**
  * Obtendo Cliente do Mongo DB
  */

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gabriel:123456ga.@gvrcluster.u6svv.mongodb.net/RGBWallet?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 });
const ObjectId = require('mongodb').ObjectID;
client.connect();

/**
 * Função que verifica no bd se a pessoa com tal id é admin
 */

async function verifyAdmin(id){
    if(id == 'undefined') {
        return false;
    }
    else{
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
        } catch(e) {
            console.log(e)
            return false;
        }
        return true;
    }
    
}
module.exports = {client , verifyAdmin};
