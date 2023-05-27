//Funtions to handle available flight searches and ticket reservations. 

//prototype, no UI implementation 

import { pool } from './database-connection.mjs'


export async function ticketSearch(req, cb) {

    //CLEAN UP LATER
    // let sql = await pool.query('SELECT f_id FROM flight WHERE flight.')
    // let sql = await pool.query('SELECT * FROM flight WHERE flight.departure=$1 AND flight.destination=$2 AND flight.d_date=$3', [req.departure, req.destinaton, req.d_date]);
    // let data = sql.rows;
    // if (data.length === 0) {
    //     return cb(null, { message: 'No flights available.' });
    // } else {
    //CLEAN UP 
    

    //if there are available flights
    //FIND and GROUP reserved seats by f_id and seat class HOPEFULLY
    //works in postgres, needs testing in actual app
    // let reserved = await pool.query('SELECT ticket.f_id, seat_class, COUNT(seat_no), t_f_seats, t_b_seats, t_e_seats FROM ticket JOIN flight ON ticket.f_id=flight.f_id AND ticket.f_id IN $1 GROUP BY ticket.f_id, seat_class, t_f_seats, t_b_seats, t_e_seats', [req.f_id]);

    //FIND and GROUP reserved seats, calculate the total of reserved seats for said f_id 
    let reserved = await pool.query('SELECT ticket.f_id, seat_class, COUNT(seat_no) FROM ticket WHERE ticket.f_id=$1 GROUP BY ticket.f_id, seat_class', [req.f_id]);
    let data = reserved.rows;

    //get total number of seats for each class of said flight
    let query = await pool.query('SELECT t_f_seats, t_b_seats, t_e_seats FROM flight WHERE flight.f_id=$1', [req.f_id]);
    let total = query.rows;

    let result_f = total[0].t_f_seats;
    let result_e = total[0].t_e_seats;
    let result_b = total[0].t_b_seats;

    //if there are reserved tickets
    //code to check for seat_class letter and then subtract the count column from the appropriate t_seats column
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].seat_class === 'F') {
                result_f = result_f - data[i].count;
            } else if (data[i].seat_class === 'B') {
                result_b = result_b - data[i].count;
            } else {
                result_e = result_e - data[i].count;
            }
        }
    }
    //returns the f_id sent via POST request, and the number of each available seat in the callback
    //cb(err, result)) format
    return cb(null, {
        f_id: req.f_id,
        f_seats: result_f,
        b_seats: result_b,
        e_seats: result_e
    });
}


export async function ticketReserve(req, cb) {
    //messy but whatever, no time to refactor database to optimize.
    if (req.seat_class === 'F') {
        let price = await pool.query('SELECT first FROM flight WHERE f_id=$1', req.f_id);
    } else if (req.seat_class === 'B') {
        let price = await pool.query('SELECT business FROM flight WHERE f_id=$1', req.f_id);
    } else {
        let price = await pool.query('SELECT economy FROM flight WHERE f_id=$1', req.f_id);
    }
    //might not need this 
    // const newTicket = new myTicket(price, seat_class, seat_no, username, f_id);

    //Need to pass into req the values for seat class
    //Caution on how f_id is selected by the user, it shouldn't be an input because it's a foreign key. It MUST exist in the flight list already!
    await pool.query('INSERT INTO ticket(price, seat_class, seats_no, username, f_id VALUES ($1, $2, $3, $4, $5)', [price, req.seat_class, req.seat_no, req.user.username, req.f_id]);

    //return cb or render
}


//remove ticket
export async function ticketRemove(req, cb) {
    await pool.query('DELETE FROM ticket WHERE t_id=1 RETURNING t_id', [req.t_id]);
    //return cb or render
}