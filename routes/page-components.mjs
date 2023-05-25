const announcementsController = await import(`../controller/announcements-controller.mjs`);
const travelController = await import(`../controller/travel-controller.mjs`);

export async function homepage(request, response) {
    let announcements = await announcementsController.getAnnouncements();
    response.render('index',
    {
        layout: 'userContent.hbs',
        locationList: null,
        connections: null,
        announcementList: announcements
    })
}

export async function aboutpage(request, response) {
    let announcements = await announcementsController.getAnnouncements();
    response.render('about',
    {
        layout: 'userContent.hbs',
        locationList: null,
        connections: null,
        announcementList: announcements
    })
}

export async function loginpage(request, response) {
    let announcements = await announcementsController.getAnnouncements();
    response.render('login',
    {
        layout: 'userContent.hbs',
        announcementList: announcements
    })
}

export async function adminDashboard(request, response) {
    let announcements = await announcementsController.getAnnouncements();
    response.render('admin',
    {
        layout: 'userContent.hbs',
        announcementList: announcements
    })
}
