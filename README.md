# Untitled Travel Agency
This application is a webserver with a postgres database connection that manages a store for flight reservations.

## Install dependencies
The project dependencies are as follows.
- **dotenv** is required so that the configuration does not have to be hardcoded
- **express** and **express-handlebars** is the server
- **pg** and **node-postgres** for the database connection
The dependencies can be installed with "npm i"
Use pgAdmin 4 or your tool of choice to load the database. 

## Start server (development)
During development use "npm run watch" to run with nodemon which restarts node when triggered by changes.

## Start server (production)
Start server with "npm run start"

**Entry point is start.mjs (formerly server.mjs).**
