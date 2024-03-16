const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pasteBinDatabase').then(()=>{
    console.log("Connected to Mongo DB")
})
// useCreateIndex - helps in creating indeces. 

// Creating a model - We give tableName and Fields needed
// For Each field we can give type, Validation and other things
const Paste = mongoose.model('paste',new mongoose.Schema({
    pasteId:{
        type: String
    },
    title:{
        type: String
    },
    pasteData:{
        type: String
    },
    createdBy:{
        type: String
    },
    expireAt: { type: Date, expires: 0 } // Set this to expire at that point

},
{
    timestamps:true // Stores Created time
}))

module.exports = Paste;