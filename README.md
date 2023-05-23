# Untitled Travel Agency
This application is a webserver with a postgres database connection that manages a store for flight reservations.

## Install dependencies
The project dependencies are as follows.
- **dotenv** is required so that the configuration does not have to be hardcoded
- **express** and **express-handlebars** is the server
- **pg** and **node-postgres** for the database connection
The dependencies can be installed with "npm i"

## Setting up the database
The database is managed through PostgreSQL.
This is run as a separate server to which the main app connects.
One way of managing the database is as follows.
- Install **postgresql-server** for the main server
- Install **postgresql-contrib** since the database requires the **pgcrypto** module
- Change the **pg_hba.config** to allow connections following the **trust** authentication system
> In a standard fedora installation this file is '/var/lib/pgsql/data/pg_hba.conf'
- Start the postgresql server making sure that the configuration file has been loaded
- Create a database with the appropriate name, load the .sql file using the Query Tool and run it.
- Populate the database for test purposes by running "node populate.mjs" in the terminal.
> you may need to create a role for your postgresql server with the necessary attributes in order to use **createdb** and **psql** or have access to the filesystem
Another way of managing the website is through pgAdmin 4.

## Start server (development)
During development use "npm run watch" to run with nodemon which restarts node when triggered by changes.

## Start server (production)
Start server with "npm run start"

**Entry point is start.mjs (formerly server.mjs).**
