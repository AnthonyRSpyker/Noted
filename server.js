const fs = require('fs');
const express = require('express');
const notes = require('./db/notes.js');
const path = require('path');
//const db = require("/Develop/db/db.json");

//sets up express and the port
const app = express();
const PORT = 3000;

//makes it so express returns objects parssed.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//should fetch pages from the server and deliver to these routes.

app.get("/api/notes", (req, res) => {
    notes.getNotes().then(data => {
        return res.json(data);
    });
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    
    notes.addNotes(newNote).then(data => res.json(data));
});

app.delete("/api/notes/:id", (req, res) => { 
    notes.deleteNotes(req.params.id).then(() => res.json({ ok:true }));
});

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));


//sets an active listener to the port.
app.listen(PORT, () => console.log(`We be listenen' on ${PORT}`));

