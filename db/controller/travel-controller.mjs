/**
 * Είναι ο controller για τη σελίδα που δημιουργείται με το ./view/flights.hbs
 *
 * Η flights αλλάζει τα περιεχόμενά της στέλνοντας αιτήματα HTTP στον εξυπηρετητή.
 *
 */
import { Flight as myFlight } from '../model/flight.js'
import dotenv from 'dotenv';
import pool from '../database.js'


const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

/** Διαλέξτε το κατάλληλο μοντέλο στο αρχείο .env */
const model = await import(`../model/${process.env.MODEL}/travel-model-${process.env.MODEL}.mjs`);

export async function listAllFlights (req, res) {
   try {
      const flights = await model.getAllFlights(userId);
      res.render('flights', { flights: flights });
   }
   catch (err) {
      res.send(err);
   }
}

export async function addFlight(req, res) {
   //Κατασκευάζουμε μια νέα πτήση και τη βάζουμε στην βάση:
   const newFlight = new myFlight('default', req.query.company, req.query.departure, req.query.d_date, req.query.destination, req.query.a_date, req.query.total_f_seats, req.query.total_b_seats, req.query.total_e_seats);
   try {
      const sql = await pool.query('INSERT INTO flight(company, departure, d_date, destination, a_date, total_f_seats, total_b_seats, total_e_seats) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING f_id',  
      [newFlight.company,  newFlight.departure, newFlight.d_date, newFlight.destination, newFlight.a_date, newFlight.total_f_seats, newFlight.total_b_seats, newFlight.total_e_seats]);

      // const lastInsertId = await model.addFlight(newFlight, userId)
      const allFlights = await model.getAllFlights(userId)
      res.render('flights', { flights: allFlights });
   } catch (error) {
      res.send(error);
   }
}


// export async function toggleFlight(req, res) {
//    try {
//       await model.toggleTask(req.params.toggleTaskId, userId);
//       const allTasks = await model.getAllTasks(userId)
//       res.render('tasks', { tasks: allTasks, model: process.env.MODEL });
//    } catch (error) {
//       res.send(error);
//    }
// }


export async function removeFlight(req, res) {
   try {
      model.removeTask(req.params.removeFlightId, userId)
      const allFlights = await model.getAllFlights(userId)
      res.render('flights', { flights: allFlights });
   } catch (err) {
      res.send(err);
   }
}

export async function listAllUsers(req, res) {
   try {
      const users = await model.getAllUsers(userId);
      res.render('users', { users: users });
   } catch (err) {
      res.send(err);
   }
}
