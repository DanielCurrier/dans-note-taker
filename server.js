// Dependencies
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

// Express initialized
const app = express();
const PORT = process.env.PORT || 3001;

// Data parsing 
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes file
app.use(require('./routes/routes.js'));

app.use(express.static(__dirname + "/public"));
// Listener setup
app.listen(PORT, () => {
    console.log(`App Listening on PORT:${PORT}!`);
});