import "reflect-metadata"
import express from "express";
import userRoutes from './routes/userRoutes'
import cookieParser from "cookie-parser"
import { pool } from './config/db'


//creating the express app
const app = express()

app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api/v1/users', userRoutes)

const PORT = 3000;
//checking the connection
const testConnection = async (): Promise<void> => {
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
