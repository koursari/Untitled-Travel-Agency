// Functins to authenticate and register users

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
// import { Users as myUser } from '../model/fields.js'
import pool from './database-connection.js'

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
                // console.log('FUCKING SUCCESS LETS GO');
                return cb(null, data[0].username);
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
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });

// In deserializeUser that key is matched with the in memory array / database or any data resource.
// The fetched object is attached to the request object as req.user
 
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  
}
