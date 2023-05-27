import dotenv from 'dotenv';
dotenv.config();
//project is run from root folder and so .env is found

import pg from 'pg';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const pool = new pg.Pool({
   connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : connectionString,
   ssl: false
})

pool.connect()
   .then(() => console.log('connected'))
   .catch(err => console.error('connection error', err.stack))

export { pool }