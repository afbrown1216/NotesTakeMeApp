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
app.get("/api/notes", function(req,res) {
    // console.log(db);
    // res.sendFile(path.join(__dirname, "db/db.json"));
    
// res.send();
    fs.readFile("db/db.json", (err,data)=> {
        if (err) throw err; 
        
        var newData = JSON.parse(data);

        res.json(newData);
    })
    
 } )

//  //get notes by id 
//  app.get("/api/notes:id", function(req,res) {
     
//  })
//post notes
 app.post('/api/notes', function (req,res) {
    //  console.log(req.body);
     fs.readFile("./db/db.json", function(err,data) {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        console.log('req', req.body)
        // console.log(parsedData);
        var newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4()
        };
        // console.log(req.params)
        parsedData.push(newNote);

    //     // parsedData.push(req.body);
    //     let note = JSON.(newNote)
    //    console.log(req.body);
    //    console.log(newNote);
        // fs.appendFile("./db/db.json", JSON.stringify(newNote), "utf8", function (err,data) {
        //     if (err) throw err; 
        //     console.log("New note added! ")
        // })

        var stringData = JSON.stringify(parsedData)
        fs.writeFile("./db/db.json",JSON.stringify(parsedData), (err) => {
            if (err) throw err; 

            res.json(parsedData);
        });
     })
    
    //res.send("Recieved a POST HTTP method")
 })
// //delete note
 app.delete('/api/notes/:id', function (req,res){
     fs.readFile("./db/db.json",(err,data) => {
         if (err) throw err;
        //  console.log("data",data);
         let deleteData = JSON.parse(data);
        //  console.log("dData: ", deleteData);
        //  console.log("request",req.body)
        //  console.log("id",req.params.id)
         let id = req.params.id;
         var getaway= deleteData.filter(note => note.id !== id );
         console.log(getaway)
        //  for(var i = 0; i > deleteData.length; i++){
        //      if (i === id){
        //          console.log("match")
        //      } 
        //      console.log('here')
        //  }
        fs.writeFile("./db/db.json",JSON.stringify(getaway), (err) => {
            if (err) throw err; 

            res.json();
        });
     }
     
     )
    //  console.log(req.body);
    res.send("Recieved a DELETE HTTP method")
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
