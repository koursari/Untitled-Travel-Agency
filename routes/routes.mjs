import express from 'express'
const announcementsController = await import(`../controller/announcements-controller.mjs`);

const router = express.Router();

//router.route('/').get((request, response) => {response.render('index', {layout: 'userContent.hbs'})});
router.route('/index').get(async (request, response) => {
    let announcements = await announcementsController.getAnnouncements();
    response.render('index',
    {
        layout: 'userContent.hbs',
        locationList: null,
        connections: null,
        announcementList: announcements
    })
});
router.route('/about').get(async (request, response) => {
    let announcements = await announcementsController.getAnnouncements();
    response.render('about',
    {
        layout: 'userContent.hbs',
        announcementList: announcements
    })
});
router.route('/profile').get(async (request, response) => {
    let announcements = await announcementsController.getAnnouncements();
    response.render('profile',
    {
        layout: 'userContent.hbs',
        announcementList: announcements
    })
});

const travelController = await import(`../controller/travel-controller.mjs`)


router.route('/admin/flights').get((request, response) => {
    response.render('about',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});
router.route('/admin/users').get((request, response) => {
    response.render('about',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});
router.route('/admin/tickers').get((request, response) => {
    response.render('about',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});

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