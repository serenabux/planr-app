create table locations(
loc_id SERIAL PRIMARY KEY, 
city varchar(50) NOT NULL, 
country varchar (50) NOT NULL, 
attractions JSON NOT NULL
)

