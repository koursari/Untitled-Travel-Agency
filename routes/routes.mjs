import express from 'express'
const pages = await import(`./page-components.mjs`)

const router = express.Router();

router.route('/').get(pages.homepage);
router.route('/home').get(pages.homepage);

router.route('/about').get(pages.aboutpage);
router.route('/profile').get(pages.adminDashboard);

router.route('/login').get(pages.loginpage);

router.route('/admin/flights').get(pages.flightsView);
router.route('/admin/users').get(pages.usersView);
router.route('/admin/tickets').get(pages.ticketsView);

/*
//router.get('/flights/remove/:removeFlightId', travelController.removeFlight);
//router.get('/flights/add/', travelController.addFlight);
*/
export { router };