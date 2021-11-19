// Dependencies for the project

const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { parse } = require('path');


// Firing the server 
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// adding the static Middleware

app.use(express.static("./public"));

//Routing API : GET request
app.get('/api/notes', function(req, res) {
    //console.log(`Hello I am listening on ${PORT}`)
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//Routing API : POST request

app.post('/api/notes', function(req, res) {

    const {title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4()
    }
    
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function(err, data){
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote)

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(parsedNotes), function(err){
            if (err) throw err;
            console.log("NOTE SAVED")
        })
    })
    res.sendFile(path.join(__dirname, "./db/db.json"));

});

//Routing API : DELETE request

app.delete('/api/notes/:id', function(req, res) {
    const idToDelete = req.params.id;
    console.log(idToDelete)

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8",function(err, data) {
      const notes = JSON.parse(data);
        console.log("NOTES", notes)
        
      for (let i = 0; i<notes.length; i++) {
        if(idToDelete === notes[i].id) {
          notes.splice(i, 1)
        }
      }
      fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
          if(err) throw err;
          console.log("NOTE DELETED")
      })
     
     res.sendFile(path.join(__dirname, "./db/db.json"));
    })
    })

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
  
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
  
  
  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});