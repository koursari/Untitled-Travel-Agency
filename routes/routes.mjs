import express from 'express'
import passport from 'passport';
// import flash from 'express-flash';
import { registerUser } from '../controller/user-passport.mjs';
import { ticketReserve, ticketSearch } from '../controller/ticket-controller.mjs';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

//Pages accessible by all
router.route('/').get(isNotSeekingSeating, pages.homepage);
router.route('/home').get(isNotSeekingSeating, pages.homepage);
router.route('/about').get(pages.aboutpage);

//Pages only accessible for logged in users
//first form handle, pick flight
router.post('/home', isAuthenticated, isSimpleUserPurchasing, (req, res) => {
    console.log(req.body.f_id);
    ticketSearch(req.body, (err, cb) => {
        if (err) {
            console.log(err);
        }
        
    console.log(cb);
    // res.status(200).send({
    //     f_cost: cb.f_cost,
    //     b_cost: cb.b_cost,
    //     e_cost: cb.e_cost
    // })
    })
    //204 stops the page from reloading after POST request but we can't pass any data to it
    //need to use fetch on frontend to update the prices for the available classes
    //preferably if _seats === 0, it won't be available to pick
    res.status(204).send();
});

//second form handle, pick class, submit reservation request
router.post('/reserve', isAuthenticated, isSimpleUserPurchasing, (req, res) => {
    console.log(req.body);
    console.log(req.user);
    ticketReserve(req.body, req.user, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
    })
    res.redirect('/home');
})

//Different landing pending on user type
router.get('/profile', isAuthenticated, isSimpleUserSeekingProfile, pages.userProfile);
router.get('/admin', isAuthenticated, isAdminSeekingAdminDashboard, pages.adminDashboard);

//Forbidden for non-admin
router.route('/flights').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.flightsView);
router.route('/users').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.usersView);
router.route('/tickets').get(isNotSeekingSeating, isAuthenticated, isAdminSeekingAdminDashboard, pages.ticketsView);
router.route('/announcements').get(isAuthenticated, isAdminSeekingAdminDashboard, pages.announcementsView);

//Forbidden for non-admin, plus requiring redirection
//Flights
router.get('/flights/add/', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageFlightAdd, manageFlightRedirect);
router.get('/flights/remove/:removeFlightId', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageFlightRemove, manageFlightRedirect);
//Announcements
router.get('/announcements/add/', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageAnnouncementAdd, manageAnnouncementRedirect);
router.get('/announcements/remove/:removeAnnouncementId', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageAnnouncementRemove, manageAnnouncementRedirect);
router.get('/announcements/toggle/:toggleAnnouncementId', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageAnnouncementToggle, manageAnnouncementRedirect);
//Tickets
router.get('/tickets/remove/:removeTicketId', isAuthenticated, isAdminSeekingAdminDashboard, pages.manageTicketRemove, manageTicketRedirect);
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
    if (request.user.type === 'admin') {
        return next();
    }
    response.redirect("/profile")
}

function isSimpleUserSeekingProfile(request, response, next) {
    if (request.user.type !== 'admin') {
        return next();
    }
    response.redirect("/admin")
}

function manageFlightRedirect(request, response) {
    response.redirect('/flights');
}

function manageAnnouncementRedirect(request, response) {
    response.redirect('/announcements');
}

function logoutRedirect(request, response) {
    response.redirect('/');
}

function isSimpleUserPurchasing(request, response, next) {
    if (request.user.type !== 'admin') {
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

function manageTicketRedirect(request, response, next) {
    let wasOnFlight = null;
    let redirectUrl = null;
    try {
        wasOnFlight = request.query.flightId;
        redirectUrl = '/tickets?flightId=' + wasOnFlight;
    } catch {
        redirectUrl = '/flights'
    }
    response.redirect(redirectUrl);
}

function isNotSeekingSeating(request, response, next) {
    if (!request.query.returnSeats){
        return next();
    }
    return pages.returnSeatingInfo(request, response);
}

export { router };