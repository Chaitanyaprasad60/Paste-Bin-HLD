// Importing neccesary artifacts
const Redis = require('redis');
const config = require("./config.json");
const db = require("./dbModels/dbFunctions");
const axios  = require('axios');


const redisClient = Redis.createClient({ url: process.env.REDIS_CONN_STRING || config.redisConnectString }); // Give URL of redis server for prod.


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



async function getPasteBin(req, res) {
    try {
        let isExist = await doesPasteExists(req.body.pasteId);
        if (!isExist) {
            return res.status(200).send({
                status:"error",
                response:"Paste Does not exist"
            })
        }

        let paste = await getOrSetPasteCache(req.body.pasteId,async ()=>{
            //Get Data From MongoDB.
            let pasteData = await db.getPaste(req.body.pasteId); 
            return pasteData;
        })

        return res.status(200).send({
            status:"status",
            response: paste
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            status:"error",
            response: error || "Error occured while getting paste content"
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

// An interesting shortcut.
// Instead of writing this as a promise and awaiting inside it, just return it and await on doesPasteExists
async function doesPasteExists(pasteId){
    let bloomFilterName = process.env.BLOOM_FILTER || config.bloomFilterName;
    return redisClient.bf.exists(bloomFilterName,pasteId);
}


// Steps to Create a new Paste
// 1. Get a new key from Key Generation Service
// 2. Enter this new key with the data into the mongoDB. 
async function addNewPaste(req, res) {
    try {

        let pasteId = "abcdefghi123";
        var expiryDate = new Date();
        //expiryDate.setDate(expiryDate.getDate() + 10);
        expiryDate.setSeconds(expiryDate.getSeconds() + 70);


        let response = await db.addPaste({
            pasteId,
            title: "Title it is",
            pasteData: "Data it is",
            createdBy: "Chaitanya Prasad",
            expireAt: expiryDate
        })
        return res.status(200).send({
            status: "success",
            response: pasteId
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: "error",
            response: error || "Error occured while creating new paste"
        })
    }
}




module.exports = {
    getPasteBin,
    addNewPaste
};