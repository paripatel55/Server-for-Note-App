const express = require("express") // creating a express object to use in our project 
const mongoose = require('mongoose')
var app = express()
var Data = require('./noteSchema') // where to look for the note schema 

mongoose.connect("mongodb://localhost/myDB") // we want mongoose to connect to moongoose DB (the folder that all of our data is stored in)

mongoose.connection.once("open", () => { // make sure it can connect to the DB
    console.log("Connected to DB!") // console is another word for print in JS 
}).on("error", (error) => {
    console.log("Failed to connect" + error)
})

// Create a note 

// Post request - sending something to the server (posting something to the server)

app.post("/create", (req, res) => { // request object (holds note, title, date -> what the iphone is going to send us) The response is what we are gonna send back 

    var note = new Data ({ // we write data because we imported it as data 

        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date"), 
    })

    note.save().then(() => { // we want to save the note and then check if it is actually saved 

        if(note.isNew == false){ // the isNew tells us if the note is saved on the server and the database 
            console.log("Saved data")
            res.send("Saved data") // this tells the iphone we successfully saved the data 
        }
        else{
            console.log(" Failed to save data")
        }
    })
})
// http://146.229.1.200:8081/create -> any website if it pings this address it will go to the server 
var server = app.listen(5000, "10.4.168.47", () => { // any device on your network can access the server
    console.log("Server is running")
})
        
    

// Delete a note
app.post("/delete", (req, res) => {
    Data.findOneAndRemove({
        _id: req.get("id") 
    }, (err) => {
        console.log("Failed" + err)
    })

    res.send("Deleted")
}) 

// Post request - sending the note we want to delete to the data base 

// Update a note 

app.post("/Update", (req, res) => {
    Data.findOneAndUpdate({
        id: req.get("id")
    }, {
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("data")
    }, (err) => {
        console.log("Failed to update" + err)
    })
    res.send("Updated")
})

// Post request - sending updated note 

// Fetch notes 
app.get("/fetch", (req,res) => { // server looks through the database finds every object and then returns it using the route response. 
    // so it gives us a response with every item in the database 
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
}) 

// Get request - getting all the notes from the server 
