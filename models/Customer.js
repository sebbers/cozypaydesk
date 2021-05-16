const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  userId: { type: ObjectId, ref: 'User', index: true, require: true, },
  firstName: {
    type: String,
    require: [true, "Please add a first name"]
  },

  lastName: {
    type: String,
    require: [true, "Please add a last name"]
  },

  company: { type: String },

  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },

  createdAt: {
    type: Date,
    default: Date.now 
  }

})

module.exports = mongoose.model('Customer', customerSchema);