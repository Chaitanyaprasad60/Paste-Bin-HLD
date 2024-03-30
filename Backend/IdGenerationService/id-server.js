/*
The purpose of this server is to allote a unique Id for Paste
*/

// Importing neccesary artifacts
const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const config = require("./config.json");
const db = require("./DBFiles/db");

// Declaring neccesary variables. 
const app = express();
const PORT = process.env.PORT || config.port || 4000;

//To Set Accpet all origins flag on response Headers as * 
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get("/getNewId",(req,res)=>{
    
    db.query("INSERT INTO pasteBinIds(pasteId) VALUE(0)",(err,data)=>{
        if(err){
            return res.status(200).send({
                "status":"error",
                "response":err || "Errror while generating pasteId" 
            })
        }
        else{
            let id = data.insertId;
            let pasteLink = convertToBase(id,"GdelUEcnmLrzOasKXWkohxZuivTIJpMCQyNYBFqwjAfHDPbSgRtV",7);
            return res.status(200).send({
                "status":"success",
                "response":pasteLink
            })

        }
    })
});

function convertToBase(number, baseChars, size) {
    const base = baseChars.length;
    let result = '';
    let storeSize = size;

    while (number > 0 && storeSize > 0) {
        const remainder = number % base;
        result = baseChars[remainder] + result;
        number = Math.floor(number / base);
        storeSize--;
    }

    // If the result size is less than the specified size, pad with characters from the beginning of baseChars
    if (result.length < size) {
        const padding = size - result.length;
        const paddingChar = baseChars[0];
        result = paddingChar.repeat(padding) + result;
    }

    // Truncate the result to the specified size
    result = result.slice(0, size);
    return result;
}

app.listen(PORT,()=>{
    console.log(`Id Generation server listening on port - ${PORT}`)
})