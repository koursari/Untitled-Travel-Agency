

//Δημιουργός (constructor) ενός αντικειμένου
//Για να δημιουργηθεί ένα νέο αντικείμενο καλείται με const newTask = new Task('Περιγραφή μιας εργασίας');
exports.Flight = function (company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy ) {
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
}



//WIP for login/register module later
exports.Users = function (username, password) {
    this.username = username
    this.password = password
}