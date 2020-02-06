const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Student = new Schema({
  student_name: {
    type: String
  },
  student_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
}, 
{
  collection: 'students'
})

module.exports = mongoose.model('Student', Student)