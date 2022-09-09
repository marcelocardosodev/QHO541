const { json } = require('express');
const User = require('../models/User');

module.exports = {
    async store(req, res){
        try {
            const {email} = req.body;

            if(!email){

                return res.status(400).json({error: 'E-mail is required'});
            }

            let user = await User.findOne({email});

            if(user){

                //return res.status(400).json({error: 'User already exists'});
                return res.json(user);
                
            }
            
            user = await User.create({email});

            return res.json(user);
        } catch (error) {
          return res.status(500).json({error: "Service error, try later!"})
          console.log(error)
        }
    },

    async show(req, res){
        try {
            const users = await User.find();
            return res.json(users);

        } catch (error) {
           console.log(error) 
           return res.status(500).json({error: "Service error, try later!"})
        }
    },

    async index(req, res){

        try {
            const{email} = req.headers;
           
            const user = await User.findOne({email: email});

            if(!user){

                return res.status(400).json('User not found');
            }

            return res.json(user)
        } catch (error) {
            console.log(error) 
            return res.status(500).json({error: "Service error, try later!"})
        }
    },

    async getById(req, res){

        try {
            const{user_id} = req.params;
            
            const user = await User.findById(user_id);

            if(!user){

                return res.status(400).json('User not found');
            }

            return res.json(user)
        } catch (error) {
            console.log(error)  
            return res.status(500).json({error: "Service error, try later!"})
        }
    },

    async removeById(req, res){

        try {
            const{user_id} = req.params;
            
            const user = await User.findById(user_id);

            if(!user){

                return res.status(400).json('User not found');
            }

            await User.findByIdAndDelete(user_id);

            return res.status(200).json("Ok")
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: "Service error, try later!"}) 
        }
    },

    async updateById(req, res){

        try {
            const{user_id} = req.params;
            const {email} = req.body;
            
            const user = await User.findById(user_id);

            if(!user){

                return res.status(400).json('User not found');
            }

            if(!email){
                return res.status(400).json('Email is required');
            }

            user.email = email;

            await user.save()

            return res.json(user)
        } catch (error) {
            console.log(error) 
            return res.status(500).json({error: "Service error, try later!"}) 
        }
    }

    

}