import dotenv from 'dotenv';
dotenv.config();
//project is run from root folder and so .env is found

import pg from 'pg';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const pool = new pg.Pool({
   connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : connectionString,
   ssl: false
})

pool.connect().then(() => console.log('connected')).catch(err => console.error('connection error', err.stack));

//DATABASE STRINGS FOR EASIER HANDLING

const insFlightString = 'INSERT INTO ' +
'flight(f_id, company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username) ' +
'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) '+
'RETURNING f_id';

const lsFlightsString = 'SELECT * FROM flight';
const lsUsersString = 'SELECT * FROM users';
const lsAllAnnouncementsString = 'SELECT * FROM announcements';
const lsActiveAnnouncementsString = 'SELECT * FROM announcements WHERE announcements.status=true';

const rmFlightString = 'DELETE FROM flight WHERE f_id=$1 RETURNING f_id';

const insAdminUsersString = 'INSERT INTO admin (username, password) VALUES ($1, $2)';

const insUsersString = 'INSERT INTO users (username, password, email, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7)';

const insAnnouncementsString = 'INSERT INTO announcements (title, content, status, date, admin_username) VALUES ($1, $2, $3, $4, $5)';
const insAnnouncementsStringWithID = 'INSERT INTO announcements (id, title, content, status, date, admin_username) VALUES ($1, $2, $3, $4, $5, $6)';

const lsConnectionsString = 'SELECT departure, destination FROM flight';

const lsSpecificAnnouncementString = 'SELECT * FROM announcements WHERE id=$1';
const rmAnnouncementString = 'DELETE FROM announcements WHERE id=$1 RETURNING id';

export {
   pool,
   insFlightString,
   lsFlightsString,
   lsUsersString,
   rmFlightString,
   insAdminUsersString,
   insUsersString,
   insAnnouncementsString,
   insAnnouncementsStringWithID,
   lsAllAnnouncementsString,
   lsActiveAnnouncementsString,
   lsConnectionsString,
   lsSpecificAnnouncementString,
   rmAnnouncementString
}