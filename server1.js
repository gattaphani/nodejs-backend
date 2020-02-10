const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./server/routes/api2');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/jwtauth',{useNewUrlParser: true,useUnifiedTopology: true});

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/checking', function(req, res){
//    res.json({
//       "Tutorial": "Welcome to the Node express JWT Tutorial"
//    });
// });

app.use(cors());
app.use('/user', user);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});