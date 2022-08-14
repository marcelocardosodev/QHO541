const Hostel = require('../models/Hostel');

module.exports ={

    async store(req, res){
        try {
            const {filename} = req.file;
            
            const { owner,
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

            const hostel = await Hostel.create({
                user: user_id,
                thumbnail: filename,
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