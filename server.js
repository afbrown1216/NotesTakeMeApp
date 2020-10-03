const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require("./db/db.json");
const {v4: uuidv4} = require("uuid");
var app = express();
var PORT = process.env.PORT || 8080;


//middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")))

//API ROUTES 
//get notes
app.get("/api/notes",function(req,res) {
    // console.log(req.body);
 } )
//post notes
 app.post('/api/notes', function (req,res) {
    //  console.log(req.body);
     fs.readFile("./db/db.json", "utf8", function(err,data) {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        // console.log(parsedData);
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4()
        };
        db.push(newNote);
        // console.log(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(newNote), "utf8", function (err,data) {
            if (err) throw err; 
            console.log("New note added! ")
        })
     })
 })
//delete note
 app.delete('/api/notes/:id', function (req,res){
    //  console.log(req.body);
 })

//HTML ROUTES
//GET Request 
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  // If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/home.html"));
  });




app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
})
