const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/annuaire';
const dbName = "annuaire";

class Mongo {

    constructor() {
        if (!Mongo.instance) {
            MongoClient.connect(url, {useNewUrlParser : true }, (err, client)  => {
                if (err) throw err;
                console.log('mongo connect');
                Mongo.instance = client.db(dbName);
            });
        }
    }

    getInstance() {
        return Mongo.instance;
    }
}

module.exports = new Mongo;