import {
    pool,
    lsTicketsOfFlightString,
    rmTicketString,
    findFlightFromTicketString
} from './database-connection.mjs'


export async function listAllTicketsOfFlight(flightID) {
    const ticketList = await pool.query(lsTicketsOfFlightString, [flightID]);
    return ticketList.rows;
}

export async function removeTicket(ticketID) {
    const flightOfTicket = await pool.query(findFlightFromTicketString, [ticketID]);
    await pool.query(rmTicketString, [ticketID]);
    return flightOfTicket.rows[0].f_id
}

export async function ticketSearch(req, cb) {
    //FIND and GROUP reserved seats, calculate the total of reserved seats for said f_id 
    let reserved = await pool.query('SELECT ticket.f_id, seat_class, COUNT(seat_no) FROM ticket WHERE ticket.f_id=$1 GROUP BY ticket.f_id, seat_class', [req.f_id]);
    let data = reserved.rows;

    //get total number of seats for each class of said flight
    let query = await pool.query('SELECT t_f_seats, first, t_b_seats, business, t_e_seats, economy FROM flight WHERE flight.f_id=$1', [req.f_id]);
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

    //returns the f_id sent via POST request, and the number of each available seat in the callback
    //cb(err, result)) format
    return cb(null, {
        f_id: req.f_id,
        f_seats: available[0].t_f_seats,
        f_cost: available[0].first,
        b_seats: available[0].t_b_seats,
        b_cost: available[0].business,
        e_seats: available[0].t_e_seats,
        e_cost: available[0].economy
    });
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