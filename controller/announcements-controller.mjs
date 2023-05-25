import dotenv from 'dotenv';
import pool from '../database.js'

import {customAnnouncements} from '../database/announcements.mjs'
//import {locations, directConnections} from '../database/locations.mjs'

const userId = 'postgres';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

export async function getAnnouncements() {
   let myAnnouncements = customAnnouncements; //TO DO: get from DB
   return myAnnouncements;
}
