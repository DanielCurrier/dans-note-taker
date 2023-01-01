const fs = require('fs');
const path = require('path');



module.exports = app => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {

        if (err) {
            throw err
        };
        // variable to store notes as json data
        const notes = JSON.parse(data);

        // View routes
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });


    })
};