const userModel = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createCookie = require('../utils/feature.js')
const CustomeError = require("../utils/customErr")

const getAllUsers = async(req, res) => {
    const user = await userModel.find({}).select({_id:0, password:0, __v:0})
    res.status(200).json(user)
}


const register = async(req, res, next) => {

    try{
        let {userName, email, password} = req.body

        const user = await userModel.findOne({email : email})
    
        if(user){
            // res.status(404).json({
            //     success : false,
            //     message: 'User already exist'
            // })
            return next( new CustomeError("User already exist",404))
        }
        else{
            let hashedPassword = await bcrypt.hash(password,10)
    
            const newUser = await userModel.create({
                userName,
                email,
                password: hashedPassword
            })
    
            createCookie(newUser,res,201,"Successfully inserted")
        } 
    }catch(err){
        next(err)
    }  
}

const login = async(req, res, next) => {

    try{
        const {email, password} = req.body

        const user = await userModel.findOne({email : email})
    
        if(user){
            // res.status(200).json({
            //     status: 200,
            //     success: true,
            //     message:"Logged in Successfully"
            // })
            const isMatched = await bcrypt.compare(password,user.password)
    
            if(isMatched){
                createCookie(user,res,200,"Logged in Successfully")
            }else{
                // return res.status(404).json({
                //     status: 404,
                //     success: false,
                //     message:"Incorrect Password"
                // })
                return next( new CustomeError("Incorrect Password",404))
            }  
        }else{
            // return res.status(404).json({
            //     status: 404,
            //     success: false,
            //     message:"User Not Found"
            // })
            return next( new CustomeError("User Not Found", 404))
        }
    }catch(err){
        next(err)
    }
}

const getMyProfile = (req, res) => {
       
    res.status(200).json({
        status: 200,
        message : "Profile",
        user : req.userProfile
    })
}

const logout = (req, res) => {

    res.status(200).cookie("token", null, {
        httpOnly: true,
        maxAge: 0,
        sameSite : process.env.NODE_ENV === "Development"? "lax" : "none",
        secure : process.env.NODE_ENV === "Development"? false : true
    }).json({
        status: 200,
        success: true,
        message:"You are logged out"
    })
}



module.exports = {
    getAllUsers,
    register,
    login,
    getMyProfile,
    logout
}