const { Client } = require('pg');
require('dotenv').config()
//creating the connection pool
const pool = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

module.exports = pool;