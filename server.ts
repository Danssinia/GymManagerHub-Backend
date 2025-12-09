import "reflect-metadata"
import express from "express";
import userRoutes from './routes/userRoutes'
import cookieParser from "cookie-parser"
import { AppDataSource } from "./config/data-source";


//creating the express app
const app = express()

app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api/v1/users', userRoutes)

const PORT = 3000;
AppDataSource.initialize()
    .then(() => {
        console.log("Data source has been initialized")
        app.listen(PORT, 'localhost', () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Error during data source initialization", err)
    })

//checking the connection
// const testConnection = async (): Promise<void> => {
//     try {
//         await pool.connect();
//         console.log("Database Connected Successfully")
//         app.listen(PORT, 'localhost', () => {
//             console.log(`Server is running on port ${PORT}`)
//         })
//     } catch (error) {
//         console.log("Database Connection Error", error)
//     }
// }
// testConnection();
