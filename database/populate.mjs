import bcrypt from 'bcrypt';
let saltRounds = 10;

import pool from '../controller/database-connection.js'

import { flights } from './populate-data/flights.mjs'
import { announcements } from './populate-data/announcements.mjs'
import { admin, users } from './populate-data/users.mjs'


// Populate admin table with 1 admin user
admin[0].password = bcrypt.hashSync(admin[0].password, saltRounds);
await pool.query('INSERT INTO admin (username, password) VALUES ($1, $2)', [admin[0].username, admin[0].password]);

for (let i = 0; i < user.length; i++) {
    let hashedPassword = bcrypt.hashSync(user[i].password, saltRounds);
    await pool.query('INSERT INTO users (username, password, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            user[i].username,
            hashedPassword,
            user[i].first_name,
            user[i].last_name,
            user[i].phone,
            user[i].address
        ]
    );
}


//Populate flight list with 2 entries
for (let i = 0; i < flights.length; i++) {
    await pool.query('INSERT INTO flight(f_id, company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        [
            flights[i].f_id,
            flights[i].company,
            flights[i].departure,
            flights[i].d_date,
            flights[i].destination,
            flights[i].a_date,
            flights[i].t_f_seats,
            flights[i].first,
            flights[i].t_b_seats,
            flights[i].business,
            flights[i].t_e_seats,
            flights[i].economy,
            flights[i].admin_username
        ]
    );
}


for (let i = 0; i < announcements.length; i++) {
    await pool.query('INSERT INTO announcements (id, title, content, status, date, admin_username) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            announcements[i].id,
            announcements[i].title,
            announcements[i].content,
            announcements[i].status,
            announcements[i].date,
            announcements[i].admin_username
        ]
    );
}

process.exit(0);