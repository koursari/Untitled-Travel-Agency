//Funtions to handle available flight searches and ticket reservations. 

//prototype, no UI implementation 

import { pool, lsTicketsOfFlightString, rmTicketString } from './database-connection.mjs'
import { Ticket as myTicket } from '../model/fields.js';


export async function listAllTicketsOfFlight(flightID) {
    const ticketList = await pool.query(lsTicketsOfFlightString, [flightID]);
    return ticketList.rows;
}

export async function removeTicket(ticketID) {
    await pool.query(rmTicketString, [ticketID]);
}

export async function ticketSearch(req, cb) {
    let sql = await pool.query('SELECT * FROM flight WHERE flight.departure=$1 AND flight.destination=$2 AND flight.d_date=$3', [req.departure, req.destinaton, req.d_date]);
    let data = sql.rows;
    if (data.length === 0) {
        return cb(null, { message: 'No flights available.' });
    } else {
        //if there are available flights
        //FIND and GROUP reserved seats by f_id and seat class HOPEFULLY
        //works in postgres, needs testing in actual app
        let reserved = await pool.query('SELECT ticket.f_id, seat_class, COUNT(seat_no), t_f_seats, t_b_seats, t_e_seats FROM ticket JOIN flight ON ticket.f_id=flight.f_id AND ticket.f_id IN $1 GROUP BY ticket.f_id, seat_class, t_f_seats, t_b_seats, t_e_seats', [data.f_id]);
        //console.log(reserved.rows);

        //if there are reserved tickets
        if (reserved.length > 0) {

            //INSERT render or cb code for ticket reservation interface
            //reserved.seat_class = F/B/E should be the identifier for the class, reserved.count should be the total reserved seats count for that class
            //reserved.t_f_seats, reserved.t_b_seats, reserved.t_e_seats should have the total available for each f_id
            //code to check for seat_class letter and then subtract the count column from the appropriate t_seats column

        } else {
            //code to render page with just the total available seats of each class since no tickets have been reserved 
            //or just export the results with cb in routes to do it there
        }

    }
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