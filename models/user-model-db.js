// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    admin: Boolean,
    name: String,
    lastname: String,
    email: String,
    picture: String,
    language: String,
    googleId: String
  });
  
// const User = mongoose.model('users', userSchema);

// module.exports = User;






const User = mongoose.model('users', userSchema);

module.exports = User;