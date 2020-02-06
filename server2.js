const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const http = require('http');
const app = express();
var cors = require('cors')
// API file for interacting with MongoDB
const api = require('./server/routes/api2');

const port = 3000



// Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist/index.html')));

// Parsers
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// API location
app.use('/api2', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port,function(){
    console.log(`Running on localhost:${port}`);
})