// Importing neccesary artifacts

const config = require("./config.json");
const db = require("./helperFuncions/dbFunctions");
const axios  = require('axios');
const redis = require('./helperFuncions/bloomFunctions');




async function getPasteBin(req, res) {
    try {
        let isExist = await redis.doesPasteExists(req.body.pasteId);
        if (!isExist) {
            return res.status(200).send({
                status:"error",
                response:"Paste Does not exist"
            })
        }

        let paste = await redis.getOrSetPasteCache(req.body.pasteId,async ()=>{
            //Get Data From MongoDB.
            let pasteData = await db.getPaste(req.body.pasteId); 
            return pasteData[0];
        })

        return res.status(200).send({
            status:"success",
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





// Steps to Create a new Paste
// 1. Get a new key from Key Generation Service
// 2. Enter this new key with the data into the mongoDB. 
async function addNewPaste(req, res) {
    try {
        
        let pasteId = await getNewPasteId();
        await redis.addPasteId(pasteId);

        let response = await db.addPaste({
            pasteId,
            title: req.body.title,
            content: req.body.content,
            createdBy: req.body.createdBy,
            expireAt: req.body.expireAt
        });

        return res.status(200).json({
            status: "success",
            response: pasteId
        })

    } catch (error) {
        console.log("here",{error})
        return res.status(500).send({
            status: "error",
            response: error || "Error occured while creating new paste"
        })
    }
}



async function getNewPasteId(){
    return new Promise(async (resolve,reject)=>{
        try{
            let idGenerationLink = process.env.ID_GENERATION_LINK || config.idGenerationLink;

            let resp = await axios.get(idGenerationLink);

            if(resp.data.status == "success"){
                return resolve(resp.data.response)
            }
            else{
                return reject("Error While generating a new pasteId")
            }
        }
        catch(error){
            console.log({error})
        }
    })
   
   
}

module.exports = {
    getPasteBin,
    addNewPaste
};