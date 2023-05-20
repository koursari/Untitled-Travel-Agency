// 'use strict'
import pool from '../../database.js'

//get the flight list
export let getAllFlights = async (req,res)=>{
  try {
      const sql = await pool.query('SELECT * FROM flight');
      return sql.rows;
  }
  catch(err) {
    return res.json(409).send(err);
  }
} 


//Προσθήκη μιας νέας εργασίας
// export let addFlight = async (req, res) => {
//     //Αυτό το ερώτημα εισάγει μια νέα εγγραφή

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
export let removeFlight = async (f_id, userId) => {
  try {
     const sql = await pool.query('DELETE FROM flight WHERE f_id=$1 RETURNING f_id', [f_id]);
     return true;
  }
    catch (error) {
      return res.json(409).send(err);
    }
}


//get the user list
export let getAllUsers = async (req,res)=>{
  try {
      const sql = await pool.query('SELECT * FROM users');
      return sql.rows;
  }
  catch(err){
    return res.json(409).send(err);
  }
} 

export let getAllTickets = async (req,res)=>{
  try {
      const sql = await pool.query('SELECT * FROM ticket,flight WHERE ticket.f_id=flight.f_id');
      return sql.rows;
  }
  catch(err){
    return res.json(409).send(err);
  }
} 

export let getAllClasses = async (req,res)=>{
  try {
      const sql = await pool.query('SELECT * FROM classes,flight WHERE classes.f_id=flight.f_id');
      return sql.rows;
  }
  catch(err){
    return res.json(409).send(err);
  }
} 

export let removeClass = async (f_id, userId) => {
  try {
     const sql = await pool.query('DELETE FROM classes WHERE f_id=$1 RETURNING f_id', [f_id]);
     return true;
  }
    catch (err) {
      return res.json(409).send(err);
    }
}