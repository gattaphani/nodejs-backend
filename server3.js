const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const adUnitRoutes = require('./server/routes/api3')
const port = process.env.PORT || 4000;



// Connection URL  
mongoose.connect('mongodb://localhost:27017/ng6crud', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log('connected to db', response)
  }
});



app.use(bodyParser.json());
app.use(cors());
app.use('/adunits', adUnitRoutes);
app.listen(port, function () {
  console.log('Listening on port ' + port);
});