require('dotenv').config()
const { Pool } = require('pg')

//create connection pool
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const pool = new Pool({
   connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : connectionString,
   ssl: false
})

//connect 
pool.connect()
   .then(() => console.log('connected'))
   .catch(err => console.error('connection error', err.stack))
//export the connection pool to use 
module.exports = pool;