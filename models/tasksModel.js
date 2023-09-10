const  Mongoose  = require("mongoose")

const taskchema = new Mongoose.Schema({
    title: {
        type : String,  
        require : true
    },
    description: {
        type : String,  
        require : true
    },
    isCompleted: {
        type : Boolean,
        default : false
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    createdAt: {
        type : Date,
        default: Date.now
    }
})

// taskchema.set('autoIndex', true)

const taskModel = Mongoose.model('Task', taskchema)

module.exports = taskModel