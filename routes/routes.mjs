import express from 'express'
import passport from 'passport';

const pages = await import(`./page-components.mjs`)

const router = express.Router();

// const userModel = await import(`../controller/user-controller.mjs`)

router.route('/').get(pages.homepage);
router.route('/home').get(pages.homepage);
router.route('/about').get(pages.aboutpage);


router.route('/profile').get(pages.adminDashboard);

router.route('/admin/flights').get(pages.flightsView);
router.route('/admin/users').get(pages.usersView);
router.route('/admin/tickets').get(pages.ticketsView);

router.get('/admin/flights/add/', pages.manageFlightAdd);
router.get('/admin/flights/remove/:removeFlightId', pages.manageFlightRemove);

//USER MANAGEMENT
//router.route('/login').get(pages.loginpage);
router.get('/login', checkAuthenticated, (req, res) => {
    res.render('login',
        {
            layout: 'userContent.hbs',
            announcementList: null
        })
})

router.post('/login/user',
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    })
);

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