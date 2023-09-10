const userModel = require("../models/userModels.js")
const jwt =  require("jsonwebtoken")


const isAuthenticated = async(req, res, next) => {

    const {token} = req.cookies

    if(!token){
        res.status(404).json({
            status: 404,
            message : "Not Logged In",
            // user : userProfile
        })
    }else{
        const cookieToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
         // console.log(cookieToken);
         req.userProfile = await userModel.findById(cookieToken._id).select({password:0,__v:0})
        //  _id:0,
         next();
    }
}

module.exports = isAuthenticated