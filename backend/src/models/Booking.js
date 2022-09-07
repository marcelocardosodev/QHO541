const mongoose = require('mongoose');
const user = require('./User');
const hostel = require('./Hostel');
const guest = require('./Guest')

const BookingSchema = new mongoose.Schema({
    
    date: Date,
    check_in: Date,
    check_out: Date,
    approved: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    hostel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: hostel
    },
    guest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: guest
    }


});

const booking = mongoose.model('Booking', BookingSchema);

module.exports = booking;