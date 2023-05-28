const announcementsController = await import(`../controller/announcements-controller.mjs`);
const flightsController = await import(`../controller/flight-controller.mjs`);
const graphController = await import(`../controller/travel-graph-controller.mjs`);
const userController = await import(`../controller/user-passport.mjs`)
const ticketController = await import(`../controller/ticket-controller.mjs`)

function fillLogStatus(request) {
    try {
        if (request.user.username != undefined) {
            return true;
        }
    } catch {
        return false;
    }
}

export async function homepage(request, response) {
    let announcementList = null;
    let locationList = null;
    let connectionList = null;
    let flightsList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
        locationList = await graphController.listAllLocations();
        connectionList = await graphController.listAllConnections();
        flightsList = await flightsController.listAllFlights();
    } catch (err) {
        announcementList = [];
        flightsList = [];
        console.log(err);
    } finally {
        response.render('index',
            {
                layout: 'main.hbs',
                locations: locationList,
                connections: connectionList,
                flights: flightsList,
                announcements: announcementList,
                isLoggedIn: fillLogStatus(request)
            }
        )
    }
}

export async function aboutpage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('about',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                isLoggedIn: fillLogStatus(request)
            }
        )
    }
}

export async function loginpage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('login',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                isLoggedIn:  fillLogStatus(request),
                username: request.user,
                message: request.flash('message')
            }
        )
    }
}

export async function userProfile(request, response) {
    let announcementList = null;
    let purchasedTickets = null;
    let relevantFlights = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
        purchasedTickets = await ticketController.listAllTicketsOfUser(request.user.username);
        relevantFlights = await flightsController.listAllFlightsOfUser(request.user.username);
    } catch (err) {
        announcementList = [];
        purchasedTickets = [];
        relevantFlights = [];
        console.error(err);
    } finally {
        response.render('profile',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                isLoggedIn: fillLogStatus(request),
                username: request.user.username,
                tickets: purchasedTickets,
                flights: relevantFlights,
                message: request.flash('message')
            }
        )
    }
}

export async function adminDashboard(request, response) {
    // console.log(request.user.username, request.user.type);
    let announcementList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
    } catch (err) {
        announcementList = [];
        console.error(err);
    } finally {
        response.render('admin',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                isLoggedIn: fillLogStatus(request),
                username: request.user.username,    //We can display the logged in username somewhere in the page with this
                message: request.flash('message')
            }
        )
    }
}

export async function flightsView(request, response) {
    let announcementList = null;
    let flightList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
        flightList = await flightsController.listAllFlights();
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
                isLoggedIn: fillLogStatus(request)
            }
        )
    }
}

export async function usersView(request, response) {
    let announcementList = null;
    let userList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
        userList = await userController.listAllUsers();
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
                isLoggedIn: fillLogStatus(request)
            }
        )
    }
}

export async function announcementsView(request, response) {
    let announcementList = null;
    let announcementManagementList = null;
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
        announcementManagementList = await announcementsController.listAllAnnouncements();
    } catch (err) {
        announcementList = [];
        announcementManagementList = [];
        console.error(err);
    } finally {
        response.render('admin-announcements',
            {
                layout: 'main.hbs',
                announcements: announcementList,
                managedAnnouncements: announcementManagementList,
                isLoggedIn: fillLogStatus(request)
            }
        )
    }
}

export async function ticketsView(request, response) {
    let announcementList = null;
    let ticketList = null;
    let chosenFlight = null;
    try {
        chosenFlight = request.query.flightId;
    } catch {
        chosenFlight = null;
    }
    try {
        announcementList = await announcementsController.listActiveAnnouncements();
        ticketList = await ticketController.listAllTicketsOfFlight(chosenFlight);
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
                isLoggedIn: fillLogStatus(request)
            }
        )
    }
}

export async function manageFlightAdd(request, response, next) {
    try {
        await flightsController.addFlight(
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
            request.user.username  // request.user.username passes the session user that is logged in
        );
    } catch (err) {
        console.error(err);
    } finally {
        return next();
    }
}

export async function manageFlightRemove(request, response, next) {
    try {
        await flightsController.removeFlight(request.params.removeFlightId);
    } catch (err) {
        console.error(err);
    } finally {
        return next();
    }
}

export async function logout(request, response, next) {
    request.logout(next)
}

export async function manageTicketRemove(request, response, next) {
    let flightOfTicket = null;
    try {
        flightOfTicket = await ticketController.removeTicket(request.params.removeTicketId);
        request.query.flightId = flightOfTicket;
    } catch (err) {
        console.error(err);
    } finally {
        return next();
    }
}

export async function manageAnnouncementAdd(request, response, next){
    try {
        await announcementsController.addAnnouncement(
            request.query.title,
            request.query.content,
            request.query.status,
            request.user.username
        );
    } catch (err) {
        console.error(err);
    } finally {
        return next();
    }
}

export async function manageAnnouncementToggle(request, response, next) {
    try {
        await announcementsController.toggleAnnouncement(request.params.toggleAnnouncementId);
    } catch (err) {
        console.error(err);
    } finally {
        return next();
    }
}

export async function manageAnnouncementRemove(request, response, next) {
    try {
        await announcementsController.removeAnnouncement(request.params.removeAnnouncementId);
    } catch (err) {
        console.error(err);
    } finally {
        return next();
    }
}

export async function returnSeatingInfo(request, response) {
    let availability = await ticketController.ticketSearch(request.query.returnSeats)
    response.json(
        {
            "f_available": availability[0],
            "b_available": availability[1],
            "e_available": availability[2]
        }
    );
}

export async function manageTicketAdd(request, response, next) {
    let chosenFlight = request.body.f_id;
    let availabilityConfirmation = await ticketController.ticketSearch(chosenFlight)
    let chosenClass = request.body.f_class;
    if(chosenClass == 'F') {
        if(availabilityConfirmation[0] < 1) {
            request.body.successfulReservation = false;
            return next();
        }
    } else if (chosenClass == 'B') {
        if(availabilityConfirmation[1] < 1) {
            request.body.successfulReservation = false;
            return next();
        }
    } else {
        if(availabilityConfirmation[2] < 1) {
            request.body.successfulReservation = false;
            return next();
        }
    }
    ticketController.ticketReserve(chosenFlight, chosenClass, request.user.username);
    request.body.successfulReservation = true;
    return next();
}