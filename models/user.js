const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: {type:String, default: "examen123"},
    email: String
},{timestamps: true});
const User = mongoose.model('User', userSchema);
module.exports = User;
