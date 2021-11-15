// Dependencies for the project

const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Firing the server 
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// adding the static Middleware

app.use(express.static("../develop/public"));

//Routing API : GET request
app.get('api/notes', function(req, res) {
    //console.log(`Hello I am listening on ${PORT}`)
    readFileAsync('../develop/db/db.json', "utf-8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

//Routing API : POST request

app.post('api/notes', function(req, res) {
    
});

//Routing API : DELETE request

app.delete('api/notes', function(req, res) {

});
