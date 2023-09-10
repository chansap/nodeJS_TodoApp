const app = require('./index.js')
const dbConnect = require('./data/dbConnect.js')

const PORT = process.env.PORT || 3000;


// DB Connection
dbConnect()

app.listen(PORT, () => {
    console.log(`Server is Started on ${PORT} in ${process.env.NODE_ENV} mode`);
})