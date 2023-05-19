

//Δημιουργός (constructor) ενός αντικειμένου
//Για να δημιουργηθεί ένα νέο αντικείμενο καλείται με const newTask = new Task('Περιγραφή μιας εργασίας');
exports.Flight = function (f_id, company, departure, dep_time, destination, arr_time, total_f_seats, total_b_seats, total_e_seats ) {
    this.f_id = f_id
    this.company = company
    this.departure = departure
    this.dep_time = dep_time
    this.destination = destination
    this.arr_time = arr_time
    this.total_f_seats = total_f_seats
    this.total_b_seats = total_b_seats
    this.total_e_seats = total_e_seats
}
