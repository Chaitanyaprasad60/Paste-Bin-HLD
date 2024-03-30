const pasteDb = require("./pasteStore");

async function addPaste(pasteObject){
    return new Promise(async (resolve,reject)=>{
        try{
            let response = await pasteDb.create({
                pasteId:pasteObject.pasteId,
                title:pasteObject.title,
                content:pasteObject.content,
                createdBy: pasteObject.createdBy,
                expireAt: pasteObject.expireAt || 0
            })
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

function getPaste(pasteId){
    return pasteDb.find({pasteId});
}

module.exports = {
    getPaste,
    addPaste
}