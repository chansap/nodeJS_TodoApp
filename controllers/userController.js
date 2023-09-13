const userModel = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createCookie = require('../utils/feature.js')
const CustomeError = require("../utils/customErr")
const logger = require('../utils/winstonLog.js')

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
            return logger.error( next( new CustomeError("User already exist",404)) )
        }
        else{
            let hashedPassword = await bcrypt.hash(password,10)
    
            const newUser = await userModel.create({
                userName,
                email,
                password: hashedPassword
            })
            logger.info("User registered successfully")
            createCookie(newUser,res,201,"Successfully inserted")
        } 
    }catch(err){
        logger.error(next(err) )
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
                logger.info("=============>> Logging In");
            }else{
                // return res.status(404).json({
                //     status: 404,
                //     success: false,
                //     message:"Incorrect Password"
                // })
                return logger.warn(next( new CustomeError("Incorrect Password",404)) )
            }  
        }else{
            // return res.status(404).json({
            //     status: 404,
            //     success: false,
            //     message:"User Not Found"
            // })
            return logger.error(next( new CustomeError("User Not Found", 404)) )
        }
    }catch(err){
        logger.error(next(err.message))
    }
}

const getMyProfile = (req, res) => {
       
    logger.info(`Getting Profile for ${req.userProfile.email}`)

    res.status(200).json({
        status: 200,
        message : "Profile",
        user : req.userProfile
    })
}

const logout = (req, res) => {

    logger.info("=============>> Logging Out");
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