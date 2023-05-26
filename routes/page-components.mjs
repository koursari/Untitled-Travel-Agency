const announcementsController = await import(`../controller/announcements-controller.mjs`);
const travelController = await import(`../controller/travel-controller.mjs`);
const graphController = await import(`../controller/travel-graph-controller.mjs`);

export async function homepage(request, response) {
    let announcementList = null;
    let locationList = null;
    let connectionList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
        locationList = await graphController.listAllLocations();
        connectionList = await graphController.listAllConnections();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('index',
            {
                layout: 'main.hbs',
                locations: locationList,
                connections: connectionList,
                announcements: announcementList,
                isLoggedIn: false
            }
        )
    }
}

export async function aboutpage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('about',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                isLoggedIn: false
            }
        )
    }
}

export async function loginpage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('login',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                isLoggedIn: false,
                username: request.user,
                message: request.flash('message')
            }
        )
    }
}

export async function adminDashboard(request, response) {
    // console.log(request.user.username, request.user.type);
    let announcementList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
    } catch (err) {
        announcementList = [];
        console.error(err);
    } finally {
        if (request.user.type === 'admin') {
            response.render('admin',
                {
                    layout: 'main.hbs',
                    announcements: announcementList,
                    isLoggedIn: false,
                    username: request.user.username,    //We can display the logged in username somewhere in the page with this
                    message: request.flash('message')
                }
            )
        } else if (request.user.type === 'user') {
            response.render('profile',
                {
                    layout: 'main.hbs',
                    announcementList: announcementList,
                    isLoggedIn: false,                          //Is this used in anything?
                    username: request.user.username,                 //We can display the logged in username somewhere in the page with this
                    message: request.flash('message')
                })
        }
    }
}

export async function flightsView(request, response) {
    let announcementList = null;
    let flightList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
        flightList = await travelController.listAllFlights();
    } catch (err) {
        announcementList = [];
        flightList = [];
        console.error(err);
    } finally {
        response.render('admin-flights',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                flights: flightList,
                isLoggedIn: false
            }
        )
    }
}

export async function usersView(request, response) {
    let announcementList = null;
    let userList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
        userList = await travelController.listAllUsers();
    } catch (err) {
        announcementList = [];
        userList = [];
        console.error(err);
    } finally {
        response.render('admin-users',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                users: userList,
                isLoggedIn: false
            }
        )
    }
}

export async function announcementsView(request, response) {
    let announcementList = null;
    let userList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
        userList = await travelController.listAllUsers();
    } catch (err) {
        announcementList = [];
        userList = [];
        console.error(err);
    } finally {
        response.render('admin-announcements',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                users: userList,
                isLoggedIn: false
            }
        )
    }
}

export async function ticketsView(request, response) {
    let announcementList = null;
    let ticketList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
        ticketList = await travelController.listAllTickets();
    } catch (err) {
        announcementList = [];
        ticketList = [];
        console.error(err);
    } finally {
        response.render('admin-tickets',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                tickets: ticketList,
                isLoggedIn: false
            }
        )
    }
}

export async function manageFlightAdd(request, response) {
    let announcementList = null;
    let flightList = null;
    try {
        await travelController.addFlight(
            request.query.company,
            request.query.departure,
            request.query.d_date,
            request.query.destination,
            request.query.a_date,
            request.query.t_f_seats,
            request.query.first,
            request.query.t_b_seats,
            request.query.business,
            request.query.t_e_seats,
            request.query.economy,
            request.user.username  // req.user.username passes the session user that is logged in
        );
    } catch (err) {
        console.error(err);
    } finally {
        //maybe use middlewares here?
        response.redirect('/admin/flights');
    }
}

export async function manageFlightRemove(request, response) {
    try {
        await travelController.removeFlight(request.params.removeFlightId);
    } catch (err) {
        console.error(err);
    } finally {
        response.redirect('/admin/flights');
    }
}
