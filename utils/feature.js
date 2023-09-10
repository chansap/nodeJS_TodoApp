const jwt  = require('jsonwebtoken')

const sendCookie = async(newUser,res,statusCode,message) => {

    const toekn = await jwt.sign({_id: newUser._id},process.env.JWT_TOKEN_SECRET)

    res.status(statusCode)
    .cookie("token", toekn, {
        httpOnly : true,
        // expires : new Date( Date.now() )
        maxAge : 1000 *60 *15,   // 1 sec =1000 so 60*1 = 60secs or 1min
        sameSite : process.env.NODE_ENV === "Development"? "lax" : "none",
        secure : process.env.NODE_ENV === "Development"? false : true
    }).json({
        status:statusCode,
        message: message,
        user : newUser
    })
}

module.exports = sendCookie