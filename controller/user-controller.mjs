// Functins to authenticate and register users

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
// import { Users as myUser } from '../model/fields.js'
import pool from '../database.js'

export function initialize (passport) {
passport.use(new LocalStrategy(async function doLogin(username, password, cb) {
    const sql = await pool.query('SELECT username, password FROM users WHERE users.username=$1', [username]);
    const data = sql.rows;
    if (data.length === 0) {
        // res.status(400).json({
        //     error: "Username incorrect or not registered.",
        // });
        //             console.error('login error: ' + err);
        return cb(null, false, { message: 'Incorrect username or password.' });
        // res.redirect('/login');
    } else {
        bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) {
                // res.status(500).json({
                //     error: "Server error",
                // });
                return cb(null, false, { message: 'Incorrect username or password.' });
            } else if (result === true) { //Checking if credentials match
                console.log('FUCKING SUCCESS LETS GO');
                return cb(null, data[0].username);
                // res = {
                //     username: data.username,
                //     password: data.password,
                //     type: 'user'
                // };
                // const token = jwt.sign(
                // {
                // email: email,
                // },
                // process.env.SECRET_KEY
                // );
                console.log('signed in');
                // res.status(200).json({
                //     message: "User signed in!",
                //     // token: token,
                // });
            } else {
                //Declaring the errors
                // if (result != true)
                //     res.status(400).json({
                //         error: "Enter correct password!",
                //     });
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
        })
    }
})
);

// Stores user details inside session. serializeUser determines which data of the user
// object should be stored in the session. The result of the serializeUser method is attached
// to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
//   the user id as the key) req.session.passport.user = {id: 'xyz'}
// passport.serializeUser((user, done) => done(null, user.id));

// In deserializeUser that key is matched with the in memory array / database or any data resource.
// The fetched object is attached to the request object as req.user

// passport.deserializeUser((id, done) => {
//     pool.query(`SELECT * FROM users WHERE username = $1`, [id], (err, results) => {
//         if (err) {
//             return done(err);
//         }
//         console.log(`ID is ${results.rows[0].id}`);
//         return done(null, results.rows[0]);
//     });
// });
// }


passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  
}













// export async function doLogin(req, res) {
//     // let username = "user1";
//     // let password = "user1";
//     try {
//         const sql = await pool.query('SELECT username, password FROM users WHERE users.username=$1', [req.body.username]); //req.body.username
//         const data = sql.rows;
//         if (data.length === 0) {
//             // res.status(400).json({
//             //     error: "Username incorrect or not registered.",
//             // });
//             console.error('login error: ' + err);
//             res.redirect('/login');
//         }
//         else {
//             //Comparing the hashed password req.body.password
//             bcrypt.compare(req.body.password, data[0].password, (err, result) => {
//                 if (err) {
//                     res.status(500).json({
//                         error: "Server error",
//                     });
//                 } else if (result === true) { //Checking if credentials match
//                     res = {
//                         username: data.username,
//                         password: data.password,
//                         type: 'user'
//                     };
//                     // const token = jwt.sign(
//                     // {
//                     // email: email,
//                     // },
//                     // process.env.SECRET_KEY
//                     // );
//                     console.log('signed in');
//                     // res.status(200).json({
//                     //     message: "User signed in!",
//                     //     // token: token,
//                     // });
//                 } else {
//                     //Declaring the errors
//                     if (result != true)
//                         // res.status(400).json({
//                         //     error: "Enter correct password!",
//                         // });
//                         console.error('password error: ' + err);
//                 }
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         // res.status(500).json({
//         //     error: "Database error occurred while signing in!", //Database connection error
//         // });
//     }
// }

// await doLogin(); //test purpose delete later

// passport.use(
//     new LocalStrategy(
//         { usernameField: "username", passwordField: "password" }, doLogin
//     )
// );

// export async function checkAuthenticated(req, res) {
//     await doLogin(null, result);
//     req.session.loggedUsername = result.username;
//     req.session.loggedPassword = result.password;
//     req.session.loggedType = result.type;
//     if (req.session.loggedUsername) {
//         console.log("user authenticated");
//         next();
//     }
//     else {
//         res.render('login',
//         {
//             layout: 'userContent.hbs',
//             announcementList: customAnnouncements
//         })
//     }
// }