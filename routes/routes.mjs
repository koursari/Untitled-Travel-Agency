import express from 'express'
const router = express.Router();

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}

const travelController = await import(`../controller/travel-controller.mjs`)

//Καταχώριση συμπεριφοράς σε διάφορα path
// router.route('/').get((req, res) => { res.redirect('/flights') });
router.route('/').get((req, res) => {res.render('home')});

router.get('/flights/remove/:removeFlightId', travelController.removeFlight);
router.get('/flights/add/', travelController.addFlight);
router.get('/flights', travelController.listAllFlights);

router.get('/users', travelController.listAllUsers);

router.get('/tickets', travelController.listAllTickets);

router.get('/classes', travelController.listAllClasses);
router.get('/classes/add/', travelController.addClass);
router.get('/classes/remove/:removeFlightId', travelController.removeClass);

export default router;
