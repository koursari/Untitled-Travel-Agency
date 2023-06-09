import { Flight as myFlight } from '../model/fields.js'
import { listAllTicketsOfUser } from './ticket-controller.mjs'
import {
   pool,
   lsFlightsString,
   lsSpecificFlightString,
   insFlightString,
   rmFlightString,
   lsConnectionsString
} from './database-connection.mjs'

export async function listAllFlights() {
   const flightList = await pool.query(lsFlightsString);
   return flightList.rows;
}

export async function listAllFlightsOfUser(username) {
   let ticketList = await listAllTicketsOfUser(username);
   let flightUniqueIdList = new Array();
   ticketList.forEach(element => {
      if (!flightUniqueIdList.includes(element.f_id)) flightUniqueIdList.push(element.f_id);
   });
   let flights = new Array();
   for (const fid of flightUniqueIdList) {
      try {
         let tmp = await pool.query(lsSpecificFlightString, [fid]);
         flights.push(tmp.rows[0]);
      } catch (err) {
         console.error(err);
      }
   }
   return flights;
}

export async function addFlight(
   company,
   departure,
   d_date,
   destination,
   a_date,
   t_f_seats,
   first,
   t_b_seats,
   business,
   t_e_seats,
   economy,
   admin_username
) {
   const newFlight = new myFlight(
      company,
      departure,
      d_date.replace('T', ' '),
      destination,
      a_date.replace('T', ' '),
      t_f_seats,
      first,
      t_b_seats,
      business,
      t_e_seats,
      economy,
      admin_username
   );
   const sql = await pool.query(insFlightString,
      [
         newFlight.company,
         newFlight.departure,
         newFlight.d_date,
         newFlight.destination,
         newFlight.a_date,
         newFlight.t_f_seats,
         newFlight.first,
         newFlight.t_b_seats,
         newFlight.business,
         newFlight.t_e_seats,
         newFlight.economy,
         newFlight.admin_username
      ]
   );
}

export async function removeFlight(removeFlightId) {
   await pool.query(rmFlightString, [removeFlightId]);
}

export async function getFlightConnections() {
   const sql = await pool.query(lsConnectionsString);
   return sql.rows;
}