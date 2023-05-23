/**
 * Είναι ο controller για τη σελίδα που δημιουργείται με το ./view/flights.hbs
 *
 * Η flights αλλάζει τα περιεχόμενά της στέλνοντας αιτήματα HTTP στον εξυπηρετητή.
 *
 */
import { Flight as myFlight } from '../model/fields.js'
import dotenv from 'dotenv';
import pool from '../database.js'


const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

//display the flight table
export async function listAllFlights (req, res) {
   try {
      const flights = await getAllFlights(userId);
      res.render('flights', { flights: flights });
   }
   catch (err) {
      res.send(err);
   }
}

//get the flight table
export async function getAllFlights (req,res) {
   try {
       const sql = await pool.query('SELECT * FROM flight');
       return sql.rows;
   }
   catch(err) {
     return res.json(409).send(err);
   }
 } 

 //add to flight table
export async function addFlight(req, res) {
   //Κατασκευάζουμε μια νέα πτήση και τη βάζουμε στην βάση:
   const newFlight = new myFlight(req.query.company, req.query.departure, req.query.d_date.replace('T', ' '), req.query.destination, req.query.a_date.replace('T', ' '), req.query.t_f_seats, req.query.first, req.query.t_b_seats, req.query.business, req.query.t_e_seats, req.query.economy);
   // console.log(newFlight.company);
   try {
      const sql = await pool.query('INSERT INTO flight(company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING f_id',  
      [newFlight.company,  newFlight.departure, newFlight.d_date, newFlight.destination, newFlight.a_date, newFlight.t_f_seats, newFlight.first, newFlight.t_b_seats, newFlight.business, newFlight.t_e_seats, newFlight.economy, 'superuser']);

      // const lastInsertId = await model.addFlight(newFlight, userId)
      const allFlights = await getAllFlights(userId)
      res.render('flights', { flights: allFlights });
   } catch (error) {
      res.send(error);
   }
}

//remove from the flight table
export async function removeFlight(req, res) {
   try {
      // model.removeFlight(req.params.removeFlightId, userId)
      const sql = await pool.query('DELETE FROM flight WHERE f_id=$1 RETURNING f_id', [req.params.removeFlightId]);
      const allFlights = await getAllFlights(userId)
      res.render('flights', { flights: allFlights });
   } catch (err) {
      return res.json(409).send(err);
   }
}

//get and list the user table - split later to list and get functions to support add/remove option
export async function listAllUsers(req, res) {
   try {
      // const users = await model.getAllUsers(userId);
      const sql = await pool.query('SELECT * FROM users');
      res.render('users', { users: sql.rows });
   } catch (err) {
      return res.json(409).send(err);
   }
}

//get and list the ticket table
export async function listAllTickets(req, res) {
   try {
      const sql = await pool.query('SELECT * FROM ticket,flight WHERE ticket.f_id=flight.f_id');
      // const ticket = await model.getAllTickets(userId);
      res.render('tickets', { ticket: sql.rows });
   } catch (err) {
      return res.json(409).send(err);
   }
}

//get the departure location list
export async function getAllDepartures (req,res) {
   try {
       const sql = await pool.query('SELECT DISTINCT departure FROM flight');
       return sql.rows;
   }
   catch(err) {
     return res.json(409).send(err);
   }
 } 


 export async function getFlightConnections (req,res) {
   try {
       const sql = await pool.query('SELECT departure, destination FROM flight');
       return sql.rows;
   }
   catch(err) {
     return res.json(409).send(err);
   }
 } 