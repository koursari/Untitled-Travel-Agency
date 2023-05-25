# Untitled Travel Agency
This application is a webserver with a postgres database connection that manages a store for flight reservations.

## Install dependencies
The project dependencies are as follows.
- **dotenv** is required so that the configuration does not have to be hardcoded
- **express** and **express-handlebars** is the server
- **pg** for the database connection
The dependencies can be installed with "npm i"

## Setting up the database
The database is managed through PostgreSQL.
This is run as a separate server to which the main app connects.
One way of managing the database is as follows.
- Install **postgresql-server** for the main server
- Change the **pg_hba.config** to allow connections following the **trust** authentication system
> In a standard fedora installation this file is '/var/lib/pgsql/data/pg_hba.conf'
- Start the postgresql server making sure that the configuration file has been loaded
- Create a database with the appropriate name, load the .sql file using the Query Tool and run it.
- Populate the database for test purposes by running the populate.mjs script in the database folder in the terminal.
> you may need to create a role for your postgresql server with the necessary attributes in order to use **createdb** and **psql** or have access to the filesystem
Another way of managing the website is through pgAdmin 4.

### Running and stopping database server
After installation and creation, you can run and stop the local database by executing the following commands in the windows admin cmd for the default install directory.
> "pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start"

> "pg_ctl -D "C:\Program Files\PostgreSQL\15\data" stop"

In a linux distro with systemd the local database can be managed via
> "# systemctl start postgresql.service"

> "# systemctl stop postgresql.service"

## Start server (development)
During development use "npm run watch" to run with nodemon which restarts node when triggered by changes.

## Start server (production)
Start server with "npm run start"

**Entry point is start.mjs (formerly server.mjs).**
