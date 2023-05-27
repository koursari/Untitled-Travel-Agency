import express from 'express'
import passport from 'passport';
import flash from 'express-flash';
import { registerUser } from '../controller/user-passport.mjs';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

router.route('/').get(pages.homepage);
router.route('/home').get(pages.homepage);
router.route('/about').get(pages.aboutpage);

router.route('/admin/flights').get(checkNotAuthenticated, pages.flightsView);
router.route('/admin/users').get(checkNotAuthenticated, pages.usersView);
router.route('/admin/tickets').get(checkNotAuthenticated, pages.ticketsView);
router.route('/admin/announcements').get(checkNotAuthenticated, pages.announcementsView);

router.get('/admin/flights/add/', checkNotAuthenticated, pages.manageFlightAdd);
router.get('/admin/flights/remove/:removeFlightId', checkNotAuthenticated, pages.manageFlightRemove);

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
        console.log('User logged out successfully!');
        // console.log(req.flash('message', 'You are logged out successfully!'));
        res.render('login', {
            layout: 'main.hbs',
            // announcements: announcementList,
            isLoggedIn: false,
            // log_message: req.flash('logout_msg', 'You are logged out successfully!')
            message: 'You have logged out successfully!'
        })
    });
});

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