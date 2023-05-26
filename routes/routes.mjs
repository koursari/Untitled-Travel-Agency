import express from 'express'
import passport from 'passport';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

// const userModel = await import(`../controller/user-controller.mjs`)

router.route('/').get(pages.homepage);
router.route('/home').get(pages.homepage);
router.route('/about').get(pages.aboutpage);

router.route('/admin/flights').get(pages.flightsView);
router.route('/admin/users').get(pages.usersView);
router.route('/admin/tickets').get(pages.ticketsView);
router.route('/admin/announcements').get(pages.announcementsView);

<<<<<<< HEAD
router.get('/admin/flights/add/', pages.manageFlightAdd);
router.get('/admin/flights/remove/:removeFlightId', pages.manageFlightRemove);
=======

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
router.get('/profile', checkNotAuthenticated, (req, res) => {
    res.render('profile',
    {
        layout: 'userContent.hbs',
        announcementList: customAnnouncements
    })
});

// router.route('/profile').get((request, response) => {
//     response.render('profile',
//         {
//             layout: 'userContent.hbs',
//             announcementList: customAnnouncements
//         })
// });

>>>>>>> 0d7687c (..)

//USER MANAGEMENT
//Have a different landing page between admin/user
router.route('/profile').get(checkNotAuthenticated, pages.adminDashboard);
router.get('/login', checkAuthenticated, pages.loginpage);

router.post('/login/user',
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    })
);

<<<<<<< HEAD
//Helper functions
function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return response.redirect("/profile");
=======
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
    res.render('login', {
        layout: 'userContent',
        announcementList: customAnnouncements,
        message: 'You are logged out successfully.'
    })});
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




function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
>>>>>>> 0d7687c (..)
    }
    next();
}

function checkNotAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/login");
}


export { router };