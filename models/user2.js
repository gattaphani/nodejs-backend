  
const mongoose = require('mongoose');

var user = mongoose.Schema({
  
   email: {
     type: String, required: true
    },
   password: {
     type: String, required: true
    }
},
{
   collection:'users'
});


var AdUnit = mongoose.Schema({
   unit_name: {
     type: String
   },
   unit_price: {
     type: String
   }
 },
 {
     collection: 'adunits'
 });

 module.exports = mongoose.model('AdUnit', AdUnit);
 module.exports = mongoose.model('User', user);
