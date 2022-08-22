const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    guest_name: String,
    email: String,
    phone_number: String
    
});


const guest = mongoose.model('Guest', GuestSchema);

module.exports = guest;