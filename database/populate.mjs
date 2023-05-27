import bcrypt from 'bcrypt';
let saltRounds = 10;

import {pool} from '../controller/database-connection.mjs'
//to load the .env file correctly, the current script must be run while
//the working directory is the project root folder

import { flights } from './populate-data/flights.mjs'
import { announcements } from './populate-data/announcements.mjs'
import { admin, users } from './populate-data/users.mjs'

try {
    // Populate admin table with 1 admin user
    admin[0].password = bcrypt.hashSync(admin[0].password, saltRounds);
    await pool.query('INSERT INTO admin (username, password) VALUES ($1, $2)', [admin[0].username, admin[0].password]);

    for (let i = 0; i < users.length; i++) {
        let hashedPassword = bcrypt.hashSync(users[i].password, saltRounds);
        await pool.query('INSERT INTO users (username, password, email, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [
                users[i].username,
                hashedPassword,
                users[i].email,
                users[i].first_name,
                users[i].last_name,
                users[i].phone,
                users[i].address
            ]
        );
    }


    //Populate flight list with 2 entries
    for (let i = 0; i < flights.length; i++) {
        await pool.query('INSERT INTO flight(company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            [
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
        await pool.query('INSERT INTO announcements (title, content, status, date, admin_username) VALUES ($1, $2, $3, $4, $5)',
            [
                announcements[i].title,
                announcements[i].content,
                announcements[i].status,
                announcements[i].date,
                announcements[i].admin_username
            ]
        );
    }

    console.log("Successfully populated db with test data");
} catch (err) {
    console.error("Failed to populate db with test data");
}

process.exit(0);