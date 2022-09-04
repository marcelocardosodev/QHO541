const mongoose = require('mongoose');
const user = require('./User');

const HostelSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    breakfast: Boolean,
    location: String,
    maximum_occupants: Number,
    available: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    }


},{
    toJSON:{
        virtuals:true,
    }
});

HostelSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})

const hostel = mongoose.model('Hostel', HostelSchema);

module.exports = hostel;