CREATE EXTENSION pgcrypto;

CREATE TABLE users (
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL UNIQUE,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone" bigint NOT NULL,
	"address" varchar NOT NULL,
	"isAdmin" BOOLEAN NOT NULL,
	PRIMARY KEY ("username")
);


CREATE TABLE flight (
	"f_id" serial NOT NULL,
	"company" varchar NOT NULL,
	"departure" varchar NOT NULL,
	"d_date" timestamp without time zone NOT NULL,
	"destination" varchar NOT NULL,
	"a_date" timestamp without time zone NOT NULL,
	"t_f_seats" integer NOT NULL,
	"first" money NOT NULL,
	"t_b_seats" integer NOT NULL,
	"business" money NOT NULL,
	"t_e_seats" integer NOT NULL,
	"economy" money NOT NULL,
	PRIMARY KEY ("f_id")
);


CREATE TABLE ticket (
	"t_id" serial NOT NULL,
	"price" money NOT NULL,
	"seat" varchar NOT NULL,
	"username" varchar NOT NULL,
	"f_id" integer NOT NULL,
	PRIMARY KEY ("t_id"),
	CONSTRAINT ticket_f_id_fkey FOREIGN KEY (f_id)
        REFERENCES flight (f_id) ON DELETE CASCADE,
    CONSTRAINT ticket_username_fkey FOREIGN KEY (username)
        REFERENCES users (username) ON DELETE CASCADE
);






INSERT INTO users (username, password, first_name, last_name, phone, address, "isAdmin") VALUES 
('user1', crypt('user1', gen_salt('bf')), 'George', 'Magkas', 6972838183, 'Xanthis 52', false),
('user2', crypt('user2', gen_salt('bf')), 'Chrysanthos', 'Manolidis', 6935455821, 'Korinthou 38', false),
('user3', crypt('user3', gen_salt('bf')), 'Vasilis', 'Ioannidis', 6935552540, 'Kilkis 20', false),
('ece8035', crypt('abc123', gen_salt('bf')), 'Panos', 'Dastiridis', 6983477347, 'Kilkis 11', true);

INSERT INTO flight(f_id, company, departure, d_date, destination, a_date, t_f_seats, first, t_b_seats, business, t_e_seats, economy) VALUES 
(DEFAULT, 'Ryanair', 'Athens', '2023-6-12 13:30', 'Thessaloniki', '2023-6-12 14:30', 20, 200, 35, 100, 50, 50),
(DEFAULT, 'Ryanair', 'Athens', '2023-6-17 16:12', 'Iraklio', '2023-6-13 17:30', 20, 150, 35, 75, 50, 30);

INSERT INTO ticket(price, seat, username, f_id) VALUES 
(100, 'B12', 'user1', 1),
(200, 'F11', 'user2', 1),
(75, 'E35', 'user3', 2),
(50, 'E01', 'user3', 1);