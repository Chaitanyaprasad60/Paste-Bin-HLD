
// Importing neccesary artifacts
const express = require('express');
const cors = require('cors');
const config = require("./config.json");

// Declaring neccesary variables. 
const app = express();
const PORT = process.env.PORT || config.port || 3000;


app.use(cors());



app.listen(PORT,()=>{
    console.log(`Paste Bin server listening on port - ${PORT}`)
})