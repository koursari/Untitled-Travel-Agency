import dotenv from 'dotenv';
import pool from './database-connection.js'

const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

export async function listAllAnnouncements() {
   //to do
   //add separate function for Announcements only if they have status == true
   const announcementList = await pool.query('SELECT * FROM announcements');
   return announcementList.rows;
}