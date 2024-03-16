const pasteDb = require("./pasteStore");

async function addPaste(pasteObject){
    return new Promise(async (resolve,reject)=>{
        try{
            let response = await pasteDb.create({
                pasteId:pasteObject.paseId,
                title:pasteObject.title,
                pasteData:pasteObject.pasteData,
                createdBy: pasteObject.createdBy,
                expireAt: pasteObject.expireAt || 0
            })
            console.log({response})
            resolve({
                status:"success",
                response:"Paste Created"
            })
        }
        catch(error){
            console.log("Error",error)
            resolve({
                status:"error",
                response:"Error While Creating Paste"
            })
        }
        
    })
    
}

function getPaste(paseId){
    return pasteDb.find({paseId});
}

module.exports = {
    getPaste,
    addPaste
}