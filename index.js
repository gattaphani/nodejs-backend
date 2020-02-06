var http = require('http');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var appRoutes = require('./server/routes/appRoutes')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cors = require('cors')
mongoose.connect('mongodb://localhost/meanDb')

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use('/',appRoutes)
http.createServer(app).listen(port)


console.log('backend code is running on port:', port)