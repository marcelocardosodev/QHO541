const Booking = require('../models/Booking');
const User = require('../models/User');
const Hostel = require('../models/Hostel');
const Guest = require('../models/Guest');

const moment = require('moment');

const formatDateHour = 'YYYY-MM-DD hh:mm:ss '
const formatDate = 'YYYY-MM-DD'

module.exports = {

    async store(req, res){

        try {
            const {user_id} = req.headers;
            const {hostel_id} = req.headers;
            const {check_in,
                check_out,
                guest_name,
                guest_email,
                guest_phone} = req.body;
            

            if(moment().isAfter(check_in, formatDate)){
                
                return res.status(400).json({info: 'Check_in is not before now'});
                
            }

            if(moment(check_in).isAfter(check_out, formatDate)){
                
                return res.status(400).json({info: 'Check_out is not before Check_in'});
            }

            if(moment(check_in).isSame(check_out, formatDate)){
                
                return res.status(400).json({info: 'Minimum of one day for booking'});
            }

            const hostel = await Hostel.findById(hostel_id);

            if(!hostel){

                return res.status(404).json({info:'Hostel is not found!'});
            }

            if(hostel.available === false){

               return res.status(404).json({info:'Hostel is not available!'});
            }

            const bookingRecords = await Booking.findOne(
                {hostel: hostel_id, check_in: moment(check_in)});


            if(bookingRecords){
                return res.status(400).json({info: "There is already a reservation for this date!"});
             
            }

            const user = await User.findById(user_id);
            if(!user){
                return res.status(404).json({info: 'User is not found!'});
            }

            let guest = await Guest.findOne({email: guest_email});

            if(guest && guest.guest_name.toUpperCase().trim() !== guest_name.toUpperCase().trim()){

                return res.status(400).json({info:"Email belongs to another guest"})
            }

            if(!guest){

                guest = await Guest.create({
                    guest_name,
                    email:guest_email,
                    phone_number:guest_phone
                })
            }

            
            const booking = await Booking.create({
                user: user_id,
                hostel: hostel_id,
                guest: guest._id,
                date: moment().format(formatDate),
                check_in: moment(check_in),
                check_out: moment(check_out)
            });

           

        return res.json(booking);
            

        } catch (error) {
            
        }
    },

    async updateBooking(req, res){

        try {
            const {booking_id} = req.params;
            const {hostel_id} = req.headers;
            const {check_in, check_out} = req.body;
            
            const booking = await Booking.findById(booking_id);

            if(!booking){
                return res.status(404).json({error: "Booking is not found!"})
            }

            if(moment().isAfter(check_in, formatDate)){
                
                return res.status(400).json({error: 'Check_in is not before now'});
            }

            if(moment(check_in).isAfter(check_out, formatDate)){
                
                return res.status(400).json({error: 'Check_out is not before Check_in'});
            }

            if(moment(check_in).isSame(check_out, formatDate)){
                
                return res.status(400).json({error: 'Minimum of one day for booking'});
            }


            const hostel = await Hostel.findById(hostel_id);

            if(!hostel){

                return res.status(404).json({error:'Hostel is not found!'});
            }

            if(hostel.available === false){

               return res.status(404).json({error:'Hostel is not available!'});
            }

            const bookingRecords = await Booking.findOne(
                {hostel: hostel_id, check_in: moment(check_in)});


            if(bookingRecords){
                return res.status(400).json({error: "There is already a reservation for this date!"});
             
            }

            
             booking.check_in =  moment(check_in);
             booking.check_out =  moment(check_out);
                           
          
           await booking.save();

            return res.json(booking)
            

        } catch (error) {
            console.log(error)
            return res.status(500).json({error: "Service error, try later!"})
        }
    },

    async showBookings(req, res){
        try {
            const bookings = await Booking.find().populate('hostel').populate('guest')
            .populate('user');

            return res.status(200).json(bookings)
        } catch (error) {
            return res.status(500).json({error: "Service error, try later!"})
        }
    },

    async removeBooking(req, res){
        try {
            const{booking_id} = res.params;
            const booking = await Booking.findById(booking_id);
            if(!booking) {
                return res.status(404).json({error: "Booking is not found!"})
            }

            await Booking.findByIdAndDelete(booking_id);

            return res.status(200).json("ok");
        } catch (error) {
            return res.status(500).json({error: "Service error, try later!"})
        }
    }
}




