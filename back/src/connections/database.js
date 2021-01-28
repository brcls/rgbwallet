
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gabriel:123456ga.@gvrcluster.u6svv.mongodb.net/RGBWallet?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 });
client.connect();
module.exports = client;
