import {
    pool,
    lsTicketsOfFlightString,
    lsTicketsOfUserString,
    rmTicketString,
    findFlightFromTicketString,
    lsFlightCapacityString,
    lsReservations
} from './database-connection.mjs'

import { Ticket as myTicket } from '../model/fields.js'


export async function listAllTicketsOfFlight(flightID) {
    const ticketList = await pool.query(lsTicketsOfFlightString, [flightID]);
    return ticketList.rows;
}

export async function listAllTicketsOfUser(username) {
    const ticketList = await pool.query(lsTicketsOfUserString, [username]);
    return ticketList.rows;
}

export async function removeTicket(ticketID) {
    const flightOfTicket = await pool.query(findFlightFromTicketString, [ticketID]);
    await pool.query(rmTicketString, [ticketID]);
    return flightOfTicket.rows[0].f_id
}

export async function ticketSearch(flightID) {
    //FIND and GROUP reserved seats, calculate the total of reserved seats for said f_id 
    let reserved = await pool.query(lsReservationsString, [flightID]);
    let data = reserved.rows;

    //get total number of seats for each class of said flight
    let query = await pool.query(lsFlightCapacityString, [flightID]);
    let available = query.rows;

    //if there are reserved tickets
    //code to check for seat_class letter and then subtract the count column from the appropriate t_seats column
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].seat_class === 'F') {
                available[0].t_f_seats = available[0].t_f_seats - data[i].count;
            } else if (data[i].seat_class === 'B') {
                available[0].t_b_seats = available[0].t_b_seats - data[i].count;
            } else {
                available[0].t_e_seats = available[0].t_e_seats - data[i].count;
            }
        }
    }

    return [
        available[0].t_f_seats,
        available[0].t_b_seats,
        available[0].t_e_seats
    ]
}


export async function ticketReserve(req, user, cb) {
    //Find values for class and price picked.
    //and make the reservation.
    if (req.f_class = 'F') {
        let seat_class = 'F';
        let query = await pool.query('SELECT first FROM flight WHERE f_id=$1', [req.f_id]);
        let price = query.rows[0].first;
        await pool.query('INSERT INTO ticket(price, seat_class, username, f_id) VALUES ($1, $2, $3, $4) RETURNING t_id', [price, seat_class, user.username, req.f_id]);
    } else if (req.f_class = 'B') {
        let seat_class = 'B';
        let query = await pool.query('SELECT business FROM flight WHERE f_id=$1', [req.f_id]);
        let price = query.rows[0].business;
        await pool.query('INSERT INTO ticket(price, seat_class, username, f_id) VALUES ($1, $2, $3, $4) RETURNING t_id', [price, seat_class, user.username, req.f_id]);
    } else {
        let seat_class = 'E';
        let query = await pool.query('SELECT economy FROM flight WHERE f_id=$1', [req.f_id]);
        let price = query.rows[0].economy;
        await pool.query('INSERT INTO ticket(price, seat_class, username, f_id) VALUES ($1, $2, $3, $4) RETURNING t_id', [price, seat_class, user.username, req.f_id]);
    }
    return cb(null, { message: "Successfully reserved ticket." })
}