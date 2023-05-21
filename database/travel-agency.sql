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
	"total_f_seats" integer NOT NULL,
	"total_b_seats" integer NOT NULL,
	"total_e_seats" integer NOT NULL,	
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

CREATE TABLE classes (
	"first" money NOT NULL,
	"business" money NOT NULL,
	"economy" money NOT NULL,
	"f_id" integer NOT NULL UNIQUE,
	CONSTRAINT class_f_id_fkey FOREIGN KEY (f_id)
	    REFERENCES flight (f_id) ON DELETE CASCADE
);






INSERT INTO users (username, password, first_name, last_name, phone, address, "isAdmin") VALUES 
('toklarino', crypt('xdxd12', gen_salt('bf')), 'George', 'Magkas', 6972838183, 'Xanthis 52', false),
('toot', crypt('123fss', gen_salt('bf')), 'Chrysanthos', 'Manolidis', 6935455821, 'Korinthou 38', false),
('cxvxcv', crypt('xdsaxd12', gen_salt('bf')), 'Vasilis', 'Ioannidis', 6935552540, 'Kilkis 20', false),
('ece8035', crypt('asd123', gen_salt('bf')), 'Panos', 'Dastiridis', 6983477347, 'Kilkis 11', true);

INSERT INTO flight(f_id, company, departure, d_date, destination, a_date, total_f_seats, total_b_seats, total_e_seats) VALUES 
(DEFAULT, 'Ryanair', 'Athens', '2023-6-12 13:30', 'Thessaloniki', '2023-6-12 14:30', 20, 35, 50),
(DEFAULT, 'Ryanair', 'Athens', '2023-6-13 16:12', 'Iraklio', '2023-6-13 17:30', 20, 35, 50);

INSERT INTO ticket(price, seat, username, f_id) VALUES 
(105, 'B12', 'toot', 1),
(200, 'F11', 'toklarino', 1),
(90, 'E35', 'cxvxcv', 2),
(55, 'E01', 'ece8035', 1);