import dotenv from 'dotenv';
import {pool, lsAllAnnouncementsString} from './database-connection.mjs'

const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

export async function listAllAnnouncements() {
   const announcementList = await pool.query(lsAllAnnouncementsString);
   return announcementList.rows;
}

export async function listActiveAnnouncements() {
   return listAllAnnouncements();   
}

export async function toggleAnnouncement() {

}

export async function createAnnouncement() {

}

export async function deleteAnnouncement() {

}