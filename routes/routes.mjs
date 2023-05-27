import express from 'express'
import passport from 'passport';
import flash from 'express-flash';
import { registerUser } from '../controller/user-passport.mjs';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

//Pages accessible by all
router.route('/').get(pages.homepage);
router.route('/home').get(pages.homepage);
router.route('/about').get(pages.aboutpage);

//Pages only accessible for logged in users
router.get('/reserve', isAuthenticated, isSimpleUserPurchasing, (req, res) => {
    console.log(req.query.flight);
});

//Different landing pending on user type
router.get('/profile', isAuthenticated, isSimpleUserSeekingProfile, pages.userProfile);
router.get('/admin', isAuthenticated, isAdminSeekingAdminDashboard, pages.adminDashboard);

//Forbidden for non-admin
router.route('/admin/flights').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.flightsView);
router.route('/admin/users').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.usersView);
router.route('/admin/tickets').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.ticketsView);
router.route('/admin/announcements').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.announcementsView);

//Forbidden for non-admin, plus requiring redirection
router.get('/admin/flights/add/', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageFlightAdd, manageFlightRedirect);
router.get('/admin/flights/remove/:removeFlightId', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageFlightRemove, manageFlightRedirect);
//ADD FOR USERS/TICKETS/ANNOUNCEMENTS

//Login/Logout/Register
router.get('/login', isNotAuthenticated, pages.loginpage);
router.get('/logout', isAuthenticatedLoggingOut, pages.logout, logoutRedirect);


router.post('/login/try',
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    })
);

//register route
router.post('/register/try', (req, res) => {
    registerUser(req.body, (err, res) => {
        if (err) {
            console.log(err);
            req.flash("message", res.message);  //flash message for failed register
            res.redirect('/login');
        }
    })
    req.flash("message", res.message)      //flash message for successful register
    res.redirect('/login');
}, pages.loginpage);

//Middleware Helpers
function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/login");
}

function isNotAuthenticated(request, response, next) {
    if (!(request.isAuthenticated())) {
        return next();
    }
    response.redirect("/profile");
}

function isAdminSeekingAdminDashboard(request, response, next) {
    if(request.user.type === 'admin') {
        return next();
    }
    response.redirect("/profile")
}

function isSimpleUserSeekingProfile(request, response, next) {
    if(request.user.type !== 'admin') {
        return next();
    }
    response.redirect("/admin")
}

function manageFlightRedirect(request, response) {
    response.redirect('/admin/flights');
}

function logoutRedirect(request, response) {
    response.redirect('/');
}

function isSimpleUserPurchasing(request, response, next) {
    if(request.user.type !== 'admin') {
        return next();
    }
    response.redirect("/")
}

function isAuthenticatedLoggingOut(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/");
}

export { router };