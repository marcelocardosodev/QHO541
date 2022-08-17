const Hostel = require('../models/Hostel');
const User = require('../models/User');
const { getById } = require('./SessionController');


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
            console.log("cheguei na rota por id")
            
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
            
            const { name,
                    owner,
                    price,
                    breakfast,
                    location,
                    furnitures,
                    guest,
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
                name,
                owner,
                price,
                breakfast : brkft,
                location,
                furnitures : furnitures.split(',').map(furniture => furniture.trim()),
                guest,
                available : avlb
            })
           return res.json(hostel) ;
        } catch (error) {
           console.log(error);
        }
    }
}