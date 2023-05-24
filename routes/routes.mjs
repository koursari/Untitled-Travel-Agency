import express from 'express'
import {customAnnouncements} from '../database/announcements.mjs'
import {locations, directConnections} from '../database/locations.mjs'


const router = express.Router();

//router.route('/').get((request, response) => {response.render('index', {layout: 'userContent.hbs'})});
router.route('/index').get((request, response) => {
    response.render('index',
    {
        layout: 'userContent.hbs',
        locationList: locations,
        connections: directConnections,
        announcementList: customAnnouncements
    })
});
router.route('/about').get((request, response) => {
    response.render('about',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});
//THIS IS THE ADMIN DASHBOARD
//TO BE CHANGED WHEN WE START DOING SESSIONS
//PROFILE SHOULD REDIRECT TO LOGIN
router.route('/profile').get((request, response) => {
    response.render('admin',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});
//USER MANAGEMENT
router.route('/login').get((request, response) => {
    response.render('login',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});

const travelController = await import(`../controller/travel-controller.mjs`)

//Καταχώριση συμπεριφοράς σε διάφορα path
// router.route('/').get((req, res) => { res.redirect('/flights') });
router.route('/').get((request, response) => {
    response.render('home')
});

router.get('/flights/remove/:removeFlightId', travelController.removeFlight);
router.get('/flights/add/', travelController.addFlight);
router.get('/flights', travelController.listAllFlights);

router.get('/users', travelController.listAllUsers);

router.get('/tickets', travelController.listAllTickets);

export { router };