const Hostel = require('../models/Hostel');
const User = require('../models/User');
const { getById, updateById } = require('./SessionController');


module.exports ={

    async indexBreakfast(req, res){

        try {
            const {breakfast} = req.params;
            console.log("cheguei na rota cafe")
            let brkft = false;

            if(breakfast.toUpperCase().trim() == "TRUE"){
            brkft = true;
            }

            const hostels = await Hostel.find({breakfast : brkft});

            return res.json(hostels);
        } catch (error) {
            console.log(error);
        }

    },

    async indexAvailable(req, res){

        try {
            
            const {available} = req.params;
            
            let avlb = false;

            if(available.toUpperCase().trim() == "TRUE"){
                avlb = true;
            }

            const hostels = await Hostel.find({available : avlb});

            return res.json(hostels);

        } catch (error) {
            console.log(error);
        }

    },

    async getById(req, res){

        try {
                        
            const {hostel_id} = req.params;
                               

            const hostels = await Hostel.findById(hostel_id);

            if(!hostels){

                return res.status(400).json({error: 'Hostel not found!'}); 
            }

            return res.json(hostels);

        } catch (error) {
            console.log(error);
        }

    },

    async store(req, res){
        try {
            const {filename} = req.file;
            
            const { company,
                    price,
                    breakfast,
                    location,
                    maximum_occupants,
                    available} = req.body;
            let brkft = false;
            
            let avlb = false;

            if(breakfast.toUpperCase().trim() == "TRUE"){
                brkft = true;
            }

            if(available.toUpperCase() === "TRUE"){
                avlb = true;
            }

            const {user_id} = req.headers;

            const user = await User.findById(user_id);

            if(!user){
                return res.status(400).json({error: 'User does not exists'});
            }

            const hostel = await Hostel.create({
                user: user_id,
                thumbnail: filename,
                company,
                price,
                breakfast : brkft,
                location,
                maximum_occupants,
                available : avlb
            })
           return res.json(hostel) ;
        } catch (error) {
           console.log(error);
        }
    },

    async updateById(req, res){
        try {
            
            const {hostel_id} = req.params
            const { company,
                    price,
                    breakfast,
                    location,
                    maximum_occupants,
                    available} = req.body;
            
            const hostel = await Hostel.findById(hostel_id);

            if(!hostel){

                return res.status(404).json({'error': 'Hostel is not found!'})
            }

            if(company && company.toUpperCase().trim() !== hostel.company.toUpperCase().trim()){
                hostel.company = company;

            }

            if(price && price !== hostel.price){
                hostel.price = price;
            }

            if(breakfast && breakfast !== hostel.breakfast){
                hostel.breakfast = breakfast;
            }

            if(available && available !== hostel.available){
                hostel.available = available;
            }

            if(location && location.toUpperCase().trim() !== hostel.location.toUpperCase().trim()){
                hostel.location = location;
            }

            if(maximum_occupants && maximum_occupants !== hostel.maximum_occupants){
                hostel.maximum_occupants = maximum_occupants;
            }

            await hostel.save();

            return res.json(hostel);
        } catch (error) {
           console.log(error);
        }

    },

    async removeById(req, res){

        try {
                        
            const {hostel_id} = req.params;
                               

            const hostels = await Hostel.findById(hostel_id);

            if(!hostels){

                return res.status(400).json({error: 'Hostel not found!'}); 
            }

            await Hostel.findByIdAndDelete(hostel_id);

            return res.status(200).json({message: 'ok'})

        } catch (error) {
            console.log(error);
        }

    },
}