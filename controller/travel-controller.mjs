import { Flight as myFlight } from '../model/fields.js'
import dotenv from 'dotenv';
import pool from './database-connection.js'

import {lsFlightsString, lsUsersString, insertFlightString, rmFlightString} from './db-strings.mjs'



const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

export async function listAllFlights() {
   const flightList = await pool.query(lsFlightsString);
   return flightList.rows;
}

export async function listAllUsers() {
   const userList = await pool.query(lsUsersString);
   return userList.rows;
}

export async function listAllTickets() {
   const ticketList = await pool.query('SELECT * FROM ticket,flight WHERE ticket.f_id=flight.f_id');
   return ticketList.rows;
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
   economy
) {
   //to do
   //maybe add check for valid flight info
   //possibly in the constructor of the object
   const newFlight = new myFlight(
      'default',
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
      economy
   );
   const sql = await pool.query(insertFlightString,
      [
         newFlight.f_id,
         newFlight.company,
         newFlight.departure,
         '2023-6-12 13:30',
         newFlight.destination,
         '2023-6-12 13:30',
         newFlight.t_f_seats,
         newFlight.first,
         newFlight.t_b_seats,
         newFlight.business,
         newFlight.t_e_seats,
         newFlight.economy,
         'superuser'
      ]
   );
}

export async function removeFlight(removeFlightId) {
   await pool.query(rmFlightString, [removeFlightId]);
}

export async function getFlightConnections() {
   const sql = await pool.query('SELECT departure, destination FROM flight');
   return sql.rows;
}

/*
// get username and password for User login
// export async function doLogin (req,res) {
//    try {
//        const sql = await pool.query('SELECT username, password FROM Users');
//        return sql.rows;
//    }
//    catch(err) {
//      return res.json(409).send(err);
//    }
//  } 

//export departure and destination for search
 export async function getFlightConnections (req,res) {
   try {
       const sql = await pool.query('SELECT departure, destination FROM flight');
       return sql.rows;
   }
   catch(err) {
     return res.json(409).send(err);
   }
 } 
 */