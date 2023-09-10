const  Mongoose  = require("mongoose")

const userSchema = new Mongoose.Schema({
    userName : {
        type : String,
        require : true
    },
    email: {
        type : String,
        unique : true,
        require : true
    },
    password: {
        type : String,
        select : true,
        require : true
    },
    createdAt : {
        type : Date,
        default:Date.now
    }
})

const userModel = Mongoose.model('User', userSchema)


module.exports = userModel