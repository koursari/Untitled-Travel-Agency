import express from 'express'
import exphbs from 'express-handlebars'

const app = express();

//Χρειάζεται για το χειρισμό των αιτημάτων που έρχονται με POST
//(extended:false σημαίνει πως δε χρειαζόμαστε να διαβάσουμε εμφωλευμένα αντικείμενα που έχουν έρθει με το αίτημα POST)
app.use(express.urlencoded({ extended: false }));

//Σε κάθε request περνάμε στην ιδιότητα "locals" του response object την τιμή
//του loggedUserId. Η res.locals.userId είναι προσβάσιμη από το hbs ως `userId`
//Γενικά όλα τα μέλη του αντικειμένου res.locals είναι προσβάσιμα στη μηχανή template.
//(http://expressjs.com/en/api.html#res.locals)
app.use((req, res, next) => {
    res.locals.userId = "postgres";
    next();
})

//Use routes as listed in the routes file
import { router as routes } from './routes/routes.mjs'
app.use('/', routes);

//Static Content
app.use(express.static('public'))

//Handlebars setup
app.engine('hbs',
    exphbs.engine(
        {
            extname: 'hbs'
        }
    )
);
app.set('view engine', 'hbs');

export { app as app };