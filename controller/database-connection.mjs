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

const insTicketsString = 'INSERT INTO ticket(t_id, seat_no, price, seat_class, username, f_id) VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4)';
const insTicketShortString = 'INSERT INTO ticket(price, seat_class, username, f_id) VALUES ($1, $2, $3, $4) RETURNING t_id';

const lsConnectionsString = 'SELECT departure, destination FROM flight';

const lsSpecificAnnouncementString = 'SELECT * FROM announcements WHERE id=$1';
const rmAnnouncementString = 'DELETE FROM announcements WHERE id=$1 RETURNING id';

const lsTicketsOfFlightString = 'SELECT * FROM ticket WHERE ticket.f_id=$1';
const lsTicketsOfUserString = 'SELECT * FROM ticket WHERE ticket.username=$1';
const rmTicketString = 'DELETE FROM ticket WHERE ticket.t_id=$1';

const findFlightFromTicketString = 'SELECT f_id FROM ticket WHERE t_id=$1';

const lsFlightCapacityString = 'SELECT t_f_seats, first, t_b_seats, business, t_e_seats, economy FROM flight WHERE flight.f_id=$1';
const lsReservationsString = 'SELECT ticket.f_id, seat_class, COUNT(seat_no) FROM ticket WHERE ticket.f_id=$1 GROUP BY ticket.f_id, seat_class';

const lsSpecificFlightString = 'SELECT * FROM flight WHERE f_id=$1';

const getFirstCostByFlightString = 'SELECT first FROM flight WHERE f_id=$1'
const getBusinessCostByFlightString ='SELECT business FROM flight WHERE f_id=$1'
const getEconomyCostByFlightString ='SELECT economy FROM flight WHERE f_id=$1'

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
   insTicketsString,
   insTicketShortString,
   lsAllAnnouncementsString,
   lsActiveAnnouncementsString,
   lsConnectionsString,
   lsSpecificAnnouncementString,
   rmAnnouncementString,
   lsTicketsOfFlightString,
   lsTicketsOfUserString,
   rmTicketString,
   findFlightFromTicketString,
   lsFlightCapacityString,
   lsSpecificFlightString,
   lsReservationsString,
   getFirstCostByFlightString,
   getBusinessCostByFlightString,
   getEconomyCostByFlightString
}