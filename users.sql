create table users(
user_id SERIAL PRIMARY KEY, 
email varchar(100) NOT NULL, 
first_name varchar(50) NOT NULL, 
last_name varchar(50) NOT NULL,
password text NOT NULL,
date_created date NOT NULL DEFAULT CURRENT_DATE, 
trips_created INTEGER NOT NULL DEFAULT 0 
)

