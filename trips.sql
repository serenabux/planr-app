create table trips(
trip_id SERIAL PRIMARY KEY, 
loc_id INTEGER REFERENCES locations(loc_id),
user_id INTEGER REFERENCES users(user_id),
members TEXT, 
selected_attractions JSON, 
voting_attractions JSON, 
date_created DATE NOT NULL DEFAULT CURRENT_DATE, 
trip_start DATE NOT NULL DEFAULT CURRENT_DATE, 
trip_end DATE NOT NULL DEFAULt CURRENT_DATE + 7
)
