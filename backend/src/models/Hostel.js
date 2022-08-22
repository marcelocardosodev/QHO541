const mongoose = require('mongoose');
const user = require('./User');

const HostelSchema = new mongoose.Schema({
    thumbnail: String,
    description:String,
    company: String,
    price: Number,
    breakfast: Boolean,
    location: String,
    furnitures: [String],
    maximum_occupants: Number,
    available: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    }


});

const hostel = mongoose.model('Hostel', HostelSchema);

module.exports = hostel;