CREATE TABLE admin (
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL UNIQUE,
	PRIMARY KEY ("username")
);

CREATE TABLE users (
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL UNIQUE,
	"email" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone" bigint NOT NULL,
	"address" varchar NOT NULL,
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
	"admin_username" varchar NOT NULL,
	PRIMARY KEY ("f_id"),
	CONSTRAINT admin_user FOREIGN KEY (admin_username)
	    REFERENCES admin (username) ON DELETE CASCADE
);


CREATE TABLE ticket (
	"t_id" serial NOT NULL,
	"seat_no" serial NOT NULL,
	"price" money NOT NULL,
	"seat_class" varchar NOT NULL,
	"username" varchar NOT NULL,
	"f_id" integer NOT NULL,
	PRIMARY KEY ("t_id"),
	CONSTRAINT ticket_f_id_fkey FOREIGN KEY (f_id)
        REFERENCES flight (f_id) ON DELETE CASCADE,
    CONSTRAINT ticket_username_fkey FOREIGN KEY (username)
        REFERENCES users (username) ON DELETE CASCADE
);

CREATE TABLE announcements (
	"id" serial NOT NULL,
	"title" varchar NOT NULL,
	"content" varchar NOT NULL,
	"status" boolean NOT NULL,
	"date" timestamp without time zone NOT NULL,
	"admin_username" varchar NOT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT admin_user_a FOREIGN KEY (admin_username)
	    REFERENCES admin (username) ON DELETE CASCADE	
);