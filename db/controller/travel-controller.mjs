/**
 * Είναι ο controller για τη σελίδα που δημιουργείται με το ./view/flights.hbs
 *
 * Η flights αλλάζει τα περιεχόμενά της στέλνοντας αιτήματα HTTP στον εξυπηρετητή.
 *
 */
// import { Flight as MyFlight } from '..'
import dotenv from 'dotenv';

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
      
      console.log(flights);
   }
   catch (err) {
      res.send(err);
   }
}
//model: process.env.MODEL 

// export async function listAllFlightsRender(req, res) {

//    try {
//       const flights = await model.getAllTasks(userId)
//       res.render('tasks', { tasks: tasks, model: process.env.MODEL });
//    }
//    catch (err) {
//       res.send(err);
//    }
// }

// export async function addTask(req, res) {
//    //Κατασκευάζουμε μια νέα εργασία και τη βάζουμε στην βάση:
//    const newTask = new MyTask(null, req.query.taskName);
//    try {
//       const lastInsertId = await model.addTask(newTask, userId)
//       const allTasks = await model.getAllTasks(userId)
//       res.render('tasks', { tasks: allTasks, model: process.env.MODEL });
//    } catch (error) {
//       res.send(error);
//    }
// }

// export async function toggleTask(req, res) {
//    try {
//       await model.toggleTask(req.params.toggleTaskId, userId);
//       const allTasks = await model.getAllTasks(userId)
//       res.render('tasks', { tasks: allTasks, model: process.env.MODEL });
//    } catch (error) {
//       res.send(error);
//    }
// }

// export async function removeTask(req, res) {
//    try {
//       model.removeTask(req.params.removeTaskId, userId)
//       const allTasks = await model.getAllTasks(userId)
//       res.render('tasks', { tasks: allTasks, model: process.env.MODEL });
//    } catch (error) {
//       res.send(err);
//    }
// }
