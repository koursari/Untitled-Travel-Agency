const announcementsController = await import(`../controller/announcements-controller.mjs`);
const travelController = await import(`../controller/travel-controller.mjs`);

export async function homepage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
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
            })
    }
}

export async function aboutpage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('about',
            {
                layout: 'main.hbs',
                announcements: announcementList
            })
    }
}

export async function loginpage(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
    } catch (err) {
        announcementList = [];
        console.log(err);
    } finally {
        response.render('login',
            {
                layout: 'main.hbs',
                announcements: announcementList
            })
    }
}

export async function adminDashboard(request, response) {
    let announcementList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
    } catch (err) {
        announcementList = [];
        console.error(err);
    } finally {
        response.render('admin',
            {
                layout: 'main.hbs',
                announcements: announcementList
            })
    }
}

export async function flightsView(request, response) {
    let announcementList = null;
    let flightList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
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
        })
    }
}

export async function usersView(request, response) {
    let announcementList = null;
    let userList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
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
        })
    }
}

export async function ticketsView(request, response) {
    let announcementList = null;
    let ticketList = null;
    try {
        announcementList = await announcementsController.getAnnouncements();
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
        })
    }
}
