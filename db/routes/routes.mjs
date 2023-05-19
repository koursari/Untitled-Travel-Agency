import express from 'express'
const router = express.Router();

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}

const travelController = await import(`../controller/travel-controller.mjs`)
// const travelModel = await import('../model/postgresql/travel-model-postgresql.mjs')

//Καταχώριση συμπεριφοράς σε διάφορα path
router.route('/').get((req, res) => { res.redirect('/flights') });

// router.get('/tasks/remove/:removeTaskId', taskListController.removeTask);
// router.get('/tasks/toggle/:toggleTaskId', taskListController.toggleTask);
// router.get('/tasks', taskListController.listAllTasksRender);
// router.get('/tasks/add/', taskListController.addTask);
router.get('/flights', travelController.listAllFlights);

export default router;
