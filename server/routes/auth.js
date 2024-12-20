import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/register', async (req, res)=>{
    try { 
         const {name, email, password} = req.body;
         const user = await User.findOne({email});
         if(user){
            return res.status(401).json({success: false, message:"User already exist."});
         }

         const hashPassword = await bcrypt.hash(password, 10);

         const newUser = new User({
            name, email, password: hashPassword
         });

         await newUser.save();

         return res.status(200).json({success: true, message: "Accounted created successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Error in adding user"});
    }
});

router.post('/login', async (req, res)=>{
    try { 
         const { email, password} = req.body;
         const user = await User.findOne({email});
         if(!user){
            return res.status(401).json({success: false, message:"User not exist."});
         }

         const checkPassword = await bcrypt.compare(password, user.password);

         const token = jwt.sign({id: user._id}, "screkeyofnoteapp@123!#", {expiresIn: "5h"});

         if(!checkPassword){
            return res.status(401).json({success: false, message:"Wrong Credentials"});
         }

         return res.status(200).json({success: true,token,user: {name: user.name}, message: "Login successfully"});
    }catch(error){
        return res.status(500).json({success: false, message: "Error in Login server"});
    }
});

router.get('/verify', middleware, async(req,res)=>{
    return res.status(200).json({success: true, user: req.user});
});

export default router;