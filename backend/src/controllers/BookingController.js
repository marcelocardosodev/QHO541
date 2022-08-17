const Booking = require('../models/Booking');

module.exports = {

    async store(req, res){

        try {
            const {user_id} = req.headers;
            const {hostel_id} = req.headers;
            const {date} = req.body;

            const booking = await Booking.create({
                user: user_id,
                hostel: hostel_id,
                date,
            });

        return res.json(booking);
            

        } catch (error) {
            
        }
    }
}