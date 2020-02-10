  
var mongoose = require('mongoose');

const user = mongoose.Schema({
   email: 
   {
     type: String, required: true
    },
   password: 
   {
     type: String, required: true
   }
},
{
   collection:'users'
});


const AdUnit = mongoose.Schema({
  users: 
    {
       type:  mongoose.Schema.Types.ObjectId, 
       ref: 'User' 
    },
   unit_name: 
   {
     type: String
   },
   unit_price: 
   {
     type: String
   }
 },
 {
     collection: 'adunits'
 });

 const addUser = mongoose.model('AdUnit', AdUnit);
 const users = mongoose.model('User', user);
 module.exports = {
  addUser,
  users
 }

