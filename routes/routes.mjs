import express from 'express'
import { customAnnouncements } from '../database/announcements.mjs'
import { locations, directConnections } from '../database/locations.mjs'
import passport from 'passport';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

// const userModel = await import(`../controller/user-controller.mjs`)




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
router.get('/login', checkAuthenticated, (req, res) => {
    res.render('login',
        {
            layout: 'userContent.hbs',
            announcementList: customAnnouncements
        })
})

//previous
// router.route('/login').get((request, response) => { 
//     response.render('login',
//     {
//         layout: 'userContent.hbs',
//         announcementList: customAnnouncements
//     })
// });


router.post('/login/user',
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    })
);

const travelController = await import(`../controller/travel-controller.mjs`)

router.route('/login').get(pages.loginpage);

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
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


export { router };