
const config = require("../config.json");
const Redis = require('redis');

const redisClient = Redis.createClient({ url: process.env.REDIS_CONN_STRING || config.redisConnectString }); // Give URL of redis server for prod.
const bloomFilterName = process.env.BLOOM_FILTER || config.bloomFilterName;
const DEFAULT_EXPIRAION_TIME = 86400; // Add paste for 1 day

// Creating a connection with Redis Server. 
redisClient.connect().then(() => {
    return console.log("Connectted to Redis")
}).then(() => {
    return redisClient.ping()
}).then((data) => {
    console.log({ data })
}).catch((error)=>{
    console.log("Error While connect to Redis Server",error)
})



// An interesting shortcut.
// Instead of writing this as a promise and awaiting inside it, just return it and await on doesPasteExists
module.exports.doesPasteExists = async function doesPasteExists(pasteId){
    return redisClient.bf.exists(bloomFilterName,pasteId);
}

module.exports.addPasteId = async function addPasteId(pasteId){
    console.log({bloomFilterName,pasteId})
    return redisClient.bf.add(bloomFilterName,pasteId)
}

// Here cb shows how to get data if we there is a Cache miss. 
module.exports.getOrSetPasteCache = async function getOrSetPasteCache(key, cb) {
    //await redisClient.connect();
    return new Promise(async (resolve, reject) => {
        try {
            let data = await redisClient.get(key);
            if (data) {
                return resolve(JSON.parse(data));
            }
            const freshData = await cb();
            redisClient.SETEX(key, DEFAULT_EXPIRAION_TIME, JSON.stringify(freshData));
            resolve(freshData);
        } catch (error) {
            reject(error)
        }
    })
}