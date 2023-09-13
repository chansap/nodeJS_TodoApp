const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const winstonExpress = require('./middlewares/expressWinston')

const userRoute = require('./routes/userRoute.js')
const taskRoute = require("./routes/taskRoute.js")
const globalErrorMiddleware = require("./middlewares/error.js")

const app = express()

dotenv.config({
    path: "./data/config.env"
})

app.use(cors({
   origin : [process.env.FrontEnd_URL],
   methods : ["GET", "POST", "PUT", "DELETE"],
   credentials: true
}))

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(winstonExpress)


// routing part
app.use('/api/v1/user', userRoute)
app.use('/api/v1/task', taskRoute)

app.get("/", async(req, res) => {
    res.send("Express app is up")
})


// Error Handler
app.use(globalErrorMiddleware)

module.exports = app