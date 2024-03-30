
// Importing neccesary artifacts
const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const config = require("./config.json");
const {getPasteBin,addNewPaste} = require('./pasteBinFunctions');
const utils = require("./utilFunctions");

// Declaring neccesary variables. 
const app = express();
const PORT = process.env.PORT || config.port || 3000;

//To Set Accpet all origins flag on response Headers as * 
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.post("/getPasteData",utils.checkParams(["pasteId"]),getPasteBin);

app.post("/createPaste",
utils.checkParams(["title","content","createdBy","expireAt"]),
addNewPaste);


app.listen(PORT,()=>{
    console.log(`Paste Bin server listening on port - ${PORT}`)
})