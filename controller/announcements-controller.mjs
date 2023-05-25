import dotenv from 'dotenv';
import pool from './database-connection.mjs'

const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

export async function listAllAnnouncements() {
   const announcementList = await pool.query('SELECT * FROM announcements');
   return announcementList.rows;
}