import "reflect-metadata"
import express, { Response, Request } from "express";
import userRoutes from './routes/user.routes'
import staffRoutes from './routes/staff.routes'
import memberRoutes from './routes/member.routes'
import cookieParser from "cookie-parser"
import { AppDataSource } from "./config/data-source";


//creating the express app
const app = express()

app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/staffs', staffRoutes)
app.use('/api/v1/members',memberRoutes)

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

