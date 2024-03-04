// Importing neccesary artifacts
const Redis = require('redis');
const config = require("./config.json");


const redisClient = Redis.createClient({ url: process.env.REDIS_CONN_STRING || config.redisConnectString }); // Give URL of redis server for prod.

// Creating a connection with Redis Server. 
redisClient.connect().then(() => {
    return console.log("Connectted to Redis")
}).then(() => {
    return redisClient.ping()
}).then((data) => {
    console.log({ data })
})


async function getPasteBin(req, res) {
    try {
        let isExist = await doesPasteExists(req.body.pasteId);
        if (!isExist) {
            return res.status(200).send({
                status:"error",
                response:"Paste Does not exist"
            })
        }

        let 




    }
    catch (error) {
        return res.status(500).send({
            status:"error",
            response:"Error occured while getting paste content"
        })
    }

}

// Here cb shows how to get data if we there is a Cache miss. 
async function getOrSetPasteCache(key, cb) {
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



module.exports = getPasteBin;