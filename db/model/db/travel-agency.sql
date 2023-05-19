CREATE TABLE customer (
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
	"dep_time" TIME NOT NULL,
	"destination" varchar NOT NULL,
	"arr_time" TIME NOT NULL,
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
        REFERENCES customer (username) ON DELETE CASCADE
);

CREATE TABLE classes (
	"first" money NOT NULL,
	"business" money NOT NULL,
	"economy" money NOT NULL,
	"f_id" integer NOT NULL,
	CONSTRAINT class_f_id_fkey FOREIGN KEY (f_id)
	    REFERENCES flight (f_id) ON DELETE CASCADE
);






INSERT INTO customer (username, password, first_name, last_name, phone, address, "isAdmin") VALUES 
('toklarino', 'xdxd12', 'George', 'Magkas', 6972838183, 'Xanthis 52', false),
('toot', '123fss', 'Chrysanthos', 'Manolidis', 6935455821, 'Korinthou 38', false),
('cxvxcv', 'xdsaxd12', 'Vasilis', 'Ioannidis', 6935552540, 'Kilkis 20', false),
('ece8035', 'asd123', 'Panos', 'Dastiridis', 6983477347, 'Kilkis 11', true);

INSERT INTO flight(f_id, company, departure, dep_time, destination, arr_time, total_f_seats, total_b_seats, total_e_seats)
	VALUES (DEFAULT, 'Ryanair', 'Athens', '13:30', 'Thessaloniki', '14:30', 20, 35, 50);