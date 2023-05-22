require('dotenv').config()
const { Pool } = require('pg')
//This file sets up the connection to the postgresql server
//This is needed in the controller (which is used by routes), but also by travel-model-postgresql.mjs

//create connection pool
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const pool = new Pool({
   connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : connectionString,
   ssl: false
})

//connect 
pool.connect((err) => {
   if (err) throw (err);
});

//export the connection pool to use 
module.exports = pool;