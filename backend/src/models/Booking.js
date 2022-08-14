const mongoose = require('mongoose');
const user = require('./User');
const hostel = require('./Hostel');

const BookingSchema = new mongoose.Schema({
    guest_name: String,
    date: String,
    approved: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    hostel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: hostel
    },


});

const booking = mongoose.model('Booking', BookingSchema);

module.exports = booking;