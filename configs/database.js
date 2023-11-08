import db from 'pg'

import dotenv from 'dotenv'
dotenv.config()

export const pool = new db.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})