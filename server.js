const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const errorHandler = require("./middlewares/errorHandler")
const connectDb = require("./dbConfig/dbConnection")


const port = process.env.PORT || 6001

connectDb()

app.use(express.json())
app.use("/tasks", require("./routes/taskRoutes"))
app.use("/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})