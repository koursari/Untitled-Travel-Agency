// 'use strict'
import pool from '../../database.js'


//get the flight list
export let getAllFlights = async (req,res)=>{
  try {
      const response = await pool.query('SELECT * FROM flight');
      return response.rows;
  }
  catch(error){
      console.log(error);
      res.send("Error: "+error);
  }
} 

// export let getAllTasks = (userId) => {
//     //Φέρε όλες τις εργασίας από τη βάση
//     const stmt = sql.prepare("SELECT * FROM task WHERE user_id = ?");
//     let tasks;
//     try {
//         tasks = stmt.all(userId);
//         return tasks;
//     } catch (err) {
//         throw err;
//     }
// }

//Προσθήκη μιας νέας εργασίας
// export let addTask = (newTask, userId) => {
//     //Αυτό το ερώτημα εισάγει μια νέα εγγραφή
//     //Η πρώτη και η τελευταία τιμή (το null και το CURRENT_TIMESTAMP) εισάγονται από την SQLite
//     //Το null αφήνει την SQLite να διαλέξει τιμή (αύξοντας αριθμός)
//     //To CURRENT_TIMESTAMP σημαίνει την τρέχουσα ώρα και ημερομηνία
//     const stmt = sql.prepare('INSERT INTO task VALUES (null, ?, ?, CURRENT_TIMESTAMP, ?)');
//     let info;

//     try {
//         info = stmt.run(newTask.task, newTask.status, userId);
//         return true;
//     }
//     catch (err) {
//         throw err;
//     }
// }

//Αλλαγή της κατάστασης μιας εργασίας
// export let toggleTask = (taskId, userId) => {
//     //TODO
//     const stmt = sql.prepare("UPDATE task SET status=IIF(status == 1, 0, 1) WHERE id=?");
//     let info;

//     try {
//         info = stmt.run(taskId);
//         return true;
//     }
//     catch (error) {
//         throw error;
//     }

// }

//Αφαίρεση μιας εργασίας
// export let removeTask = (taskId, userId) => {
//     //TODO
//     const stmt = sql.prepare("DELETE from task WHERE id=?");
//     let info;

//     try {
//         info = stmt.run(taskId);
//         return true;
//     }
//     catch (error) {
//         throw error
//     }
// }
