import {
   pool,
   lsAllAnnouncementsString,
   lsActiveAnnouncementsString,
   lsSpecificAnnouncementString,
   rmAnnouncementString,
   insAnnouncementsString,
   insAnnouncementsStringWithID
} from './database-connection.mjs'

import {Announcements as myAnnouncement} from '../model/fields.js';

export async function listAllAnnouncements() {
   const announcementList = await pool.query(lsAllAnnouncementsString);
   return announcementList.rows;
}

export async function listActiveAnnouncements() {
   const announcementList = await pool.query(lsActiveAnnouncementsString);
   return announcementList.rows; 
}

export async function toggleAnnouncement(toggleAnnouncementId) {
   let asItWas = await pool.query(lsSpecificAnnouncementString, [toggleAnnouncementId]);
   let toggled = new myAnnouncement(
      asItWas.rows[0].id,
      asItWas.rows[0].title,
      asItWas.rows[0].content,
      asItWas.rows[0].status,
      asItWas.rows[0].date,
      asItWas.rows[0].admin_username
   );
   await pool.query(rmAnnouncementString, [toggleAnnouncementId]);
   if (toggled.status == true) {
      toggled.status = false;
   } else {
      toggled.status = true;
   }
   await pool.query(insAnnouncementsStringWithID,
      [
         toggled.id,
         toggled.title,
         toggled.content,
         toggled.status,
         toggled.date,
         toggled.admin_username
      ]
   );
}

export async function addAnnouncement(titleText, contentText, statusState, admin_username) {
   let timestamp = new Date().toISOString();
   let newAnnouncement = new myAnnouncement(
      null,
      titleText,
      contentText,
      statusState,
      timestamp,
      admin_username
      );
   await pool.query(insAnnouncementsString,
      [
         newAnnouncement.title,
         newAnnouncement.content,
         newAnnouncement.status,
         newAnnouncement.date,
         newAnnouncement.admin_username
      ]
   );

}

export async function removeAnnouncement(deleteAnnouncementId) {
   await pool.query(rmAnnouncementString, [deleteAnnouncementId]);
}