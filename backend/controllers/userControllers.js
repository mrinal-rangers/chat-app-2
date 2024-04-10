const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async(req,res,next)=>{
    const {name,email,password,pic} = req.body;
    if(!name || !email || !password ){
        res.status(400);
        throw new Error("Enter all fields");
    }

    const userExists = await User.findOne({email});

    const user = await User.create({
        name, email,password,pic
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name ,
            email,
            pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Failed to create user , plz try again');
    }

})

module.exports = {registerUser};