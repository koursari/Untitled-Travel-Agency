// Function to authenticate and register users

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Strategy as LocalStrategy } from 'passport-local';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import pool from './database-connection.js'

export function initialize(passport) {
    passport.use(new LocalStrategy(async function doLogin(username, password, cb) {
        let sql = await pool.query('SELECT username, password FROM admin WHERE admin.username=$1', [username]);
        let data = sql.rows;
        if (data.length === 0) {      //Checking if username exists in ADMIN table 
            sql = await pool.query('SELECT username, password FROM users WHERE users.username=$1', [username]); //Check if username exists in USERS table
            data = sql.rows;
            if (data.length === 0) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            } else {
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (err) {
                        return cb(null, false, { message: 'Incorrect username or password.' });
                    } else if (result === true) {                  //Checking if USERS credentials match
                        console.log('User logged in successfully.');
                        return cb(null, {
                            username: data[0].username,
                            type: 'user',
                            message: 'User logged in successfully.'
                        });
                    } else {
                        return cb(null, false, { message: 'Incorrect username or password.' });
                    }
                })
            }
        } else {
            bcrypt.compare(password, data[0].password, (err, result) => {
                if (err) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                } else if (result === true) {                  //Checking if ADMIN credentials match
                    console.log('Admin logged in successfully.');
                    return cb(null, {
                        username: data[0].username,
                        type: 'admin',
                        message: 'Admin logged in successfully.'
                    });
                } else {
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
    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            // console.log(user);
            cb(null, {
                username: user.username,  //Append info to req.user object to be used
                type: user.type
            });
        });
    });

    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    // The fetched object is attached to the request object as req.user

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {

            //LOG THE SESSION USER OBJECT  FOR DEBUG PURPOSES HERE
            //console.log(user); 

            return cb(null, user);
        });
    });
}

export async function registerUser(reg, cb) {
    let sql = await pool.query('SELECT username FROM admin WHERE admin.username=$1', [reg.reg_username]); //Check against the admin usernames
    let data = sql.rows;
    if (data.length > 0) {
        return cb(null, false, { message: "Username already in use." });
    } else {
        sql = await pool.query('SELECT password FROM admin WHERE admin.password=$1', [reg.reg_password]);  //Check against the admin passwords
        data = sql.rows;
        if (data.length > 0) {
            return cb(null, false, { message: 'Password already in use.' });
        }
        else {
            let sql = await pool.query('SELECT username FROM users WHERE users.username=$1', [reg.reg_username]);  //Check against the user table
            let data = sql.rows;
            if (data.length > 0) {
                return cb(null, false, { message: "Username already in use." });
            } else {
                sql = await pool.query('SELECT password FROM users WHERE users.password=$1', [reg.reg_password]);  //Check against the user table
                data = sql.rows;
                if (data.length > 0) {
                    return cb(null, false, { message: 'Password already in use.' });
                } else {
                    let hashedPassword = bcrypt.hashSync(reg.reg_password, 10);
                    await pool.query('INSERT INTO users (username, password, email, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                        [
                            reg.reg_username,
                            hashedPassword,
                            reg.reg_email,
                            reg.reg_first_name,
                            reg.reg_last_name,
                            reg.reg_phone,
                            reg.reg_address
                        ]
                    );
                    return cb(null, { message: "User successfully registered!" });
                }
            }
        }
    }
}