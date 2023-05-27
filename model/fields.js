

//Δημιουργός (constructor) ενός αντικειμένου
//Για να δημιουργηθεί ένα νέο αντικείμενο καλείται με const newTask = new Task('Περιγραφή μιας εργασίας');
exports.Flight = function (company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy, admin_username ) {
    this.company = company
    this.departure = departure
    this.d_date = d_date
    this.destination = destination
    this.a_date = a_date
    this.t_f_seats = t_f_seats
    this.first = first
    this.t_b_seats = t_b_seats
    this.business = business
    this.t_e_seats = t_e_seats
    this.economy = economy    
    this.admin_username = admin_username
}



//WIP for login/register module later
exports.Users = function (username, password, first_name, last_name, phone, address) {
    this.username = username
    this.password = password
    this.first_name = first_name
    this.last_name = last_name
    this.phone = phone 
    this.address = address
}

exports.Admin = function(username, password) {
    this.username = username
    this.password = password
}

exports.Ticket = function (t_id, price, seat_class, seat_no, username, f_id) {
    this.t_id = t_id
    this.price = price
    this.seat_class = seat_class
    this.seat_no = seat_no
    this.username = username
    this.f_id = f_id
}

exports.Announcements = function (id, title, content, status, date, admin_username) {
    this.id = id
    this.title = title
    this.content = content
    this.status = status
    this.date = date
    this.admin_username =admin_username
}