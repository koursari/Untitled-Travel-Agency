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

router.get('/admin/flights/add/', pages.manageFlightAdd);
router.get('/admin/flights/remove/:removeFlightId', pages.manageFlightRemove);

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