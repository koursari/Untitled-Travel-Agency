import bcrypt from 'bcrypt';
// import { Flight as myFlight, Users as myUser, Admin as myAdmin, Ticket as myTicket, Announcements as myAnnouncements } from '../model/fields.js'
import pool from '../controller/database-connection.js'

let saltRounds = 10;

// Populate admin table with 1 admin user
let admin = [{
    username: 'superuser',
    password: 'superuser'
}];

//async version
// bcrypt.hash(admin.password, saltRounds, function(err, hash) {
//     admin[0].password = hash;
//     if (err) throw err;
//     else {
//             console.log("stored!");
//         }
//   });

admin[0].password = bcrypt.hashSync(admin[0].password, saltRounds);
await pool.query('INSERT INTO admin (username, password) VALUES ($1, $2)', [admin[0].username, admin[0].password]);

//Populate users table with 3 entries
let user = [{
    username: 'user1',
    password: 'user1',
    first_name: 'user1',
    last_name: 'user1',
    phone: 6910010123,
    address: 'Korinthou 1'
},
{
    username: 'user2',
    password: 'user2',
    first_name: 'user2',
    last_name: 'user2',
    phone: 6910010124,
    address: 'Korinthou 2'
},
{
    username: 'user3',
    password: 'user3',
    first_name: 'user3',
    last_name: 'user3',
    phone: 6910010125,
    address: 'Korinthou 3'
}];

for (let i = 0; i < user.length; i++) {
    let hashedPassword = bcrypt.hashSync(user[i].password, 10);
    await pool.query('INSERT INTO users (username, password, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6)', [user[i].username, hashedPassword, user[i].first_name, user[i].last_name, user[i].phone, user[i].address]);   
}


//Populate flight list with 2 entries
let flights = [{
    f_id: 1,
    company: 'Ryanair',
    departure: 'Athens',
    d_date: '2023-6-12 13:30',
    destination: 'Thessaloniki',
    a_date: '2023-6-12 14:30',
    t_f_seats: 20,
    first: 200,
    t_b_seats: 35,
    business: 100,
    t_e_seats: 50,
    economy: 50,
    admin_username: 'superuser'
},
{
    f_id: 2,
    company: 'Ryanair',
    departure: 'Athens',
    d_date: '2023-6-17 16:12',
    destination: 'Iraklio',
    a_date: '2023-6-13 17:30',
    t_f_seats: 20,
    first: 150,
    t_b_seats: 35,
    business: 75,
    t_e_seats: 50,
    economy: 30,
    admin_username: 'superuser'
},
{
    f_id: 3,
    company: 'Ryanair',
    departure: 'Thessaloniki',
    d_date: '2023-7-17 16:12',
    destination: 'Iraklio',
    a_date: '2023-7-13 17:30',
    t_f_seats: 20,
    first: 150,
    t_b_seats: 35,
    business: 75,
    t_e_seats: 50,
    economy: 30,
    admin_username: 'superuser'
}];

for (let i = 0; i<flights.length; i++) {
    await pool.query('INSERT INTO flight(f_id, company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    [flights[i].f_id, flights[i].company, flights[i].departure, flights[i].d_date, flights[i].destination, flights[i].a_date, flights[i].t_f_seats, flights[i].first, flights[i].t_b_seats, flights[i].business, flights[i].t_e_seats, flights[i].economy, flights[i].admin_username]);
}

//Populate announcements
let announcements = [{
    id: 1,
    title: 'Prisma',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: true,
    date: '2023-06-22 04:56',
    admin_username: 'superuser'
},
{
    id: 2,
    title: 'Segunda',
    content: 'I am the very model of a modern Major-Gineral, Ive information vegetable, animal, and mineral, I know the kings of England, and I quote the fights historical, from Marathon to Waterloo, in order categorical.',
    status: true,
    date: '2023-06-22 04:56',
    admin_username: 'superuser'
},
{
    id: 3,
    title: 'Tetrie',
    content: 'The FitnessGram Pacer test is a multistage aerobic capacity test that progressively gets more difficult as it continues.',
    status: true,
    date: '2023-06-22 04:56',
    admin_username: 'superuser'
}];

for (let i=0; i<announcements.length; i++) {
    await pool.query('INSERT INTO announcements (id, title, content, status, date, admin_username) VALUES ($1, $2, $3, $4, $5, $6)', [
        announcements[i].id, announcements[i].title, announcements[i].content, announcements[i].status, announcements[i].date, announcements[i].admin_username]);
}

process.exit(0);