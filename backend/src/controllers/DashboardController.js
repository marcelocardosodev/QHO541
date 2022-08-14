const Hostel = require('../models/Hostel')

module.exports = {

    async show(req, res){

        try {
            const {user_id} = req.headers;

            const hostels = await Hostel.find({user: user_id})

            return res.json({hostels});

        } catch (error) {
            
        }
    }
}