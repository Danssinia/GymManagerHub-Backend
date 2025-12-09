import "reflect-metadata"
const express = require("express")
const userRoutes = require('./routes/userRoutes')
const cookie = require("cookie-parser")
//creating the express app
const app = express()
const pool = require('./config/db');
app.use(express.json());
app.use('/api/v1/users', userRoutes)
app.use(cookie())
const PORT = 3000;
//checking the connection
const testConnection = async () => {
    try {
        await pool.connect();
        console.log("Database Connected Successfully")
        app.listen(PORT, 'localhost', () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Database Connection Error", error)
    }
}
testConnection();
