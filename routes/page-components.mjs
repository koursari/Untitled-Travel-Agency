const announcementsController = await import(`../controller/announcements-controller.mjs`);
const travelController = await import(`../controller/travel-controller.mjs`);

export async function homepage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('index',
            {
                layout: 'main.hbs',
                locationList: null,
                connections: null,
                announcements: announcementList
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
                announcements: announcementList
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
                announcements: announcementList
            }
        )
    }
}

export async function adminDashboard(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.listAllAnnouncements();
    } catch (err) {
        announcementList = [];
        console.error(err);
    } finally {
        response.render('admin',
            {
                layout: 'main.hbs',
                announcements: announcementList
            }
        )
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
                flights: flightList
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
                users: userList
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
                tickets: ticketList
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
            request.query.economy
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
