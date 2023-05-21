import express from 'express'

const router = express.Router();

router.route('/').get((request, response) => {response.render('index', {layout: 'userContent.hbs'})});
router.route('/index').get((request, response) => {response.render('index', {layout: 'userContent.hbs'})});
router.route('/about').get((request, response) => {response.render('about', {layout: 'userContent.hbs'})});
router.route('/profile').get((request, response) => {response.render('profile', {layout: 'userContent.hbs'})});


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
