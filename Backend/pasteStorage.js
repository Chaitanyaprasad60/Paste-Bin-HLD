const { MongoClient } = require("mongodb");
const config = require("./config.json");

const uri = config.mongoConnect;

const client = new MongoClient(uri);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log("Connect to mongoDB Database")
    } catch (error) {
        console.log("Error in Connecting to db - ", error)
    }
}

connectToDb();

module.exports = client;