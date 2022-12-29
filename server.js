// Dependencies
const fs = require('fs')
const express = require('express');
const path = require('path');

// Express initialized
const app = express();
const PORT = 3001;

// Data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Routes file
require('./routes/routes').app;

// Listener setup
app.listen(PORT, () => {
    console.log(`App Listening on PORT: ${PORT}!`)
});