import { Client } from 'pg';
import 'dotenv/config'
//creating the connection pool
export const pool = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
})
