const { json } = require('express');
const Guest = require('../models/Guest');

module.exports = {
    async store(req, res){
        try {
            const {guest_name,
                email,
                phone_number
            } = req.body;

            let guest = await Guest.findOne({email});

            if(guest){

                return res.status(400).json({error: 'E-mail already registered'});
                
            }
            
            guest = await Guest.create({
               guest_name, 
                email, 
                phone_number});

            return res.json(guest);
        } catch (error) {
            
          console.log(error)
        }
    },

    async show(req, res){
        try {
            const guests = await Guest.find();
            return res.json(guests);

        } catch (error) {
           console.log(error) 
        }
    },

    async index(req, res){

        try {
            const{email} = req.params;
           
            const guest = await Guest.findOne({email: email});

            if(!guest){

                return res.status(400).json('Guest not found');
            }

            return res.json(guest)
        } catch (error) {
            console.log(error) 
        }
    },

    async getById(req, res){

        try {
            const{guest_id} = req.params;
            
            const guest = await Guest.findById(guest_id);

            if(!guest){

                return res.status(400).json('Guest not found');
            }

            return res.json(guest)
        } catch (error) {
            console.log(error)  
        }
    },

    async removeByEmail(req, res){

        try {
            const{email} = req.params;
            
            const guest = await Guest.findOne({email:email});

            if(!guest){

                return res.status(400).json('Guest not found');
            }

            await Guest.findByIdAndDelete(guest._id);

            return res.status(200).json("Ok")
        } catch (error) {
            console.log(error) 
        }
    },

    async updateById(req, res){

        try {
            const{guest_id} = req.params;
            const {email,
            guest_name,
            phone_number} = req.body;
            
            const guest = await Guest.findById(guest_id);

            if(!guest){

                return res.status(400).json('Guest not found');
            }

            if(email && email.toUpperCase().trim() !== guest.email.toUpperCase().trim()){
                guest.email = email;
            }

            if(guest_name && guest_name.toUpperCase().trim() !== guest.guest_name.toUpperCase().trim()){
                guest.guest_name = guest_name;
            }

            if(phone_number && phone_number.toUpperCase().trim() !== guest.phone_number.toUpperCase().trim()){
                guest.phone_number = phone_number;
            }

            await guest.save()

            return res.json(guest)
        } catch (error) {
            console.log(error)  
        }
    }

    

}