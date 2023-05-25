const insertFlightString = 'INSERT INTO ' +
'flight(f_id, company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username) ' +
'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) '+
'RETURNING f_id';

const lsFlightsString = 'SELECT * FROM flight';
const lsUsersString = 'SELECT * FROM users';

export { lsFlightsString, lsUsersString, insertFlightString }