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
export let removeTask = async (f_id, userId) => {
  try {
     const sql = await pool.query('DELETE FROM flight WHERE f_id=$1 RETURNING f_id', [f_id]);
     return true;
  }
    catch (error) {
        throw error
    }
}
