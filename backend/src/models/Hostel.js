const mongoose = require('mongoose');
const user = require('./User');

const HostelSchema = new mongoose.Schema({
    thumbnail: String,
    owner: String,
    price: Number,
    breakfast: Boolean,
    location: String,
    furnitures: [String],
    guest: Number,
    available: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    }


});

const hostel = mongoose.model('Hostel', HostelSchema);

module.exports = hostel;