const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    admin: Boolean,
    name: String,
    lastname: String,
    email: String,
    phone: Number,
    country: String,
    password: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;


