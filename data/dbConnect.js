const  Mongoose  = require("mongoose");

// const dbURL = process.env.MONGO_URL
const dbURL = process.env.MONGO_URI_ATLAS

const connectDB = () => {
    Mongoose.connect(dbURL ,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify:true,
        useCreateIndex:true
    },(err,c) =>{
        if (err) throw err
        console.log(`Connected to DB with ${c.connection.host}`);
    })
}


module.exports = connectDB
