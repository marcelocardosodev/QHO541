const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
});

//module.exports = mongoose.model('User', UserSchema);

const user = mongoose.model('User', UserSchema);

module.exports = user;