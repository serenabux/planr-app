select * from users

select * from trips where user_id = (select user_id from users where email = 'test4@test.com') or members like '%test3@test.com%'

select * from trips where user_id = (select user_id from users where email = 'home@home.com') or members like '%home@home.com'

insert into trips (user_id, members) VALUES (36, 'add@trip.com')
insert into trips (user_id, members) VALUES (39, 'test12@test.com')
select * from trips
delete from trips where trip_id = 4

select * from trips where members like '%test3@test.com%'
update trips set members = CONCAT(members,',home@home.com') where user_id = 39

delete from trips