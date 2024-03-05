
// Importing neccesary artifacts
const express = require('express');
const cors = require('cors');
const config = require("./config.json");
const getPasteBin = require('./getPastebin');
const utils = require("./utilFunctions");

// Declaring neccesary variables. 
const app = express();
const PORT = process.env.PORT || config.port || 3000;


app.use(cors());

app.get("/getPasteData",utils.checkParams(["pasteId"]),(req,res)=>{
    getPasteBin(req,res);
});


app.listen(PORT,()=>{
    console.log(`Paste Bin server listening on port - ${PORT}`)
})