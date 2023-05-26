import express from 'express'
import passport from 'passport';
import { checkRegister } from '../controller/user-passport.mjs';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

router.route('/').get(pages.homepage);
router.route('/home').get(pages.homepage);
router.route('/about').get(pages.aboutpage);

router.route('/admin/flights').get(pages.flightsView);
router.route('/admin/users').get(pages.usersView);
router.route('/admin/tickets').get(pages.ticketsView);
router.route('/admin/announcements').get(pages.announcementsView);

router.get('/admin/flights/add/', pages.manageFlightAdd);
router.get('/admin/flights/remove/:removeFlightId', pages.manageFlightRemove);

//USER MANAGEMENT
//Have a different landing page between admin/user
router.get('/profile', checkNotAuthenticated, pages.adminDashboard);

router.get('/login', checkAuthenticated, pages.loginpage);

router.post('/login/try',
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    })
);

//logout route
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.render('login', {
            layout: 'main.hbs',
            // announcements: announcementList,
            isLoggedIn: false,
            message: 'You are logged out successfully.'
        })
    });
});

//register route
router.post('/register/try', checkRegister(req.body, res), pages.loginpage);

//Helper functions
function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return response.redirect("/profile");
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