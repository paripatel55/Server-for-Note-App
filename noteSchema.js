// allows us to define a note object, so mongoose knows what a note object is 
var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var note = new Schema({ // create the note object and everything inside of it 

    title: String,
    date: String,
    note: String,
})
// now it knows what a note object is 

const Data = mongoose.model("data", note) // creates a data object that is actually a note schema

module.exports = Data; // allows us to send this to the server.js file 

