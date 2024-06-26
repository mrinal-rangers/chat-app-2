const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const { useTheme } = require('@emotion/react');

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

const authUser = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body ;
    const user =  await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id:user._id,
            name :user.name ,
            email,
            pic : user.pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid username or password');
    }

})

//api/user/search = mrinal
const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query.search
    ? {
        $or: [
            { name: { $regex: `^${req.query.search}`, $options: "i" } },
            { name: { $regex: `.*${req.query.search}.*`, $options: "i" } },
            { email: { $regex: `^${req.query.search}@`, $options: "i" } },
          ],
      }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);

 })

module.exports = {registerUser,authUser,allUsers};