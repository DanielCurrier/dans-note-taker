const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const router = express.Router();


fs.readFile("./db/db.json", 'utf8', (err, data) => {

    if (err) {
        throw err
    };
    // variable to store notes as json data
    const notes = JSON.parse(data);

    // API routes

    // sets up route to fetch notes
    router.get('/api/notes', (req, res) => {
        // reads the db file and returns notes as json data
        res.json(notes);
    });

    // sets up the post route
    router.post('/api/notes', (req, res) => {
        // receives a new note, and appends that note to the 
        let newNote = req.body;
        newNote.id = uuid.v4();
        notes.push(newNote);
        updateDb();
        console.log(`New note added: ${newNote}`);
        res.json(newNote);
    });

    // retrieves a note with a unique id, and then displays that information
    router.get('/api/notes/:id', (req, res) => {
        res.json(notes[req.params.id]);
    });

    router.delete("/api/notes/:id", (req, res) => {
        const deletedItems = notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with id " + req.params.id);
        if (deletedItems.length === 0) {
            res.status(404).json({
                message: `No such note ${req.params.id}.`
            })
        } else {
            res.json(deletedItems[0]);
        };
    });

    // View routes
    router.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    function updateDb() {
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            if (err) throw err;
            return true;
        });
    }
});


module.exports = router;