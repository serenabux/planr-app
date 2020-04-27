import json
from passlib.context import CryptContext
import psycopg2
import sys
from datetime import datetime
import DB_manager

conn = psycopg2.connect(host = DB_manager.get_hostname(), 
                        database = DB_manager.get_database(), 
                        user = DB_manager.get_user(), 
                        password = DB_manager.get_password(), 
                        port = DB_manager.get_port())
cursor = conn.cursor()

def get_name(uid):
    q = "select first_name from users where user_id = {}".format(uid)
    cursor.execute(q)
    name = cursor.fetchone()[0].capitalize()
    return name

def get_upcoming_trips(uid):
    ret = {"Trips": []}
    q_email = "select email from users where user_id = {}".format(uid)
    cursor.execute(q_email)
    email = cursor.fetchone()[0]
    q_trips = "select trip_id, tripname, loc_id, TO_CHAR(trip_start,  'MM/DD/YYYY'), TO_CHAR(trip_end,  'MM/DD/YYYY') from trips where user_id = {} or members like '%{}%'".format(uid, email)
    cursor.execute(q_trips)
    trips = cursor.fetchall()
    for t in trips:
        d = {}
        d['trip_id'] = t[0]
        d['name'] = t[1]
        q_loc = "select city from destinations where dest_id = {}".format(t[2])
        cursor.execute(q_loc)
        d['location'] = cursor.fetchone()[0]
        d['start'] = t[3]
        d['end'] = t[4]
        ret["Trips"].append(d)
    return ret

def validate_name(uid, new_name):
    q_email = "select email from users where user_id = {}".format(uid)
    cursor.execute(q_email)
    email = cursor.fetchone()[0]         
    q_trips = "select tripname from trips where user_id = {} or members like '%{}%'".format(uid, email)
    cursor.execute(q_trips)
    trips = cursor.fetchall()
    for name in trips:
        if(new_name.lower() == name[0].lower()):
            return -1
    return 1

def validate_invitee(email):
    q_count = "select count(*) from users where email = '{}'".format(email)
    cursor.execute(q_count)
    count = cursor.fetchone()[0]
    if count != 0:
        return 1
    else: 
        return -1

def add_trip(uid, name, location, start, end, invitees):
    city, country = location.split(',')
    country = country[1:]
    q_loc_id = "select dest_id from destinations where city = '{}' and country = '{}'".format(city, country)
    cursor.execute(q_loc_id)
    dest_id = cursor.fetchone()[0]
    start = datetime.strptime(start, '%m/%d/%Y')
    end = datetime.strptime(end, '%m/%d/%Y')
    if(len(invitees)):
        members = ','.join(invitees)
        q_insert = "insert into trips (loc_id, user_id, members, date_created, trip_start, trip_end, tripname) values ({}, {}, '{}', now(), '{}', '{}', '{}')".format(dest_id, uid, members, start, end, name)
        cursor.execute(q_insert)
        conn.commit()
    else:
        q_insert = "insert into trips (loc_id, user_id, date_created, trip_start, trip_end, tripname) values ({}, {}, now(), '{}', '{}', '{}')".format(dest_id, uid, start, end, name)
        cursor.execute(q_insert)
        conn.commit()

    q_tripid = "select trip_id from trips where user_id = {} and tripname = '{}'".format(uid, name)
    cursor.execute(q_tripid)
    trip_id = cursor.fetchone()[0]
    return trip_id

def delete_trip(uid, trip_id):
    q_get_creatorid = "select user_id from trips where trip_id = {}".format(trip_id)
    cursor.execute(q_get_creatorid)
    creatorid = cursor.fetchone()[0]
    if (creatorid == uid):
        q_delete = "delete from trips where trip_id = {}".format(trip_id)
        cursor.execute(q_delete)
        conn.commit()
    else:
        q_remove = "select members from trips where trip_id = {}".format(trip_id)
        cursor.execute(q_remove)
        mems = cursor.fetchone()[0].split(',')
        q_email = "select email from users where user_id = {}".format(uid)
        cursor.execute(q_email)
        email = cursor.fetchone()[0]
        new_mems = []
        for m in mems:
            if(m != email):
                new_mems.append(m)
        new_mems = ','.join(new_mems)
        q_update_mems = "update trips set members = '{}' where trip_id = {}".format(new_mems, trip_id)
        cursor.execute(q_update_mems)
        conn.commit()

def get_trip_info(uid, trip_id):
    uid = int(uid)
    # tripname, loc_id, trip_start, trip_end, members, selected_attractions, voting_attractions
    ret = {}
    q_tripinfo = "select user_id, tripname, loc_id, trip_start, trip_end, members, selected_attractions, voting_attractions from trips where trip_id = {}".format(trip_id)
    cursor.execute(q_tripinfo)
    tripinfo = cursor.fetchone()

    q_location = "select city, country from destinations where dest_id = {}".format(tripinfo[2])
    cursor.execute(q_location)
    city, country = cursor.fetchone()

    members = []
    if (tripinfo[0] == uid):
        q_name = "select first_name, last_name, color from users where user_id = {}".format(uid)
        cursor.execute(q_name)
        first_name,last_name, color = cursor.fetchone()
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()
        name = ' '.join([first_name, last_name])
        d = {"name": name, "color": color}
        members.append(d)
    else:
        q_name = "select first_name, last_name, color from users where user_id = {}".format(tripinfo[0])
        cursor.execute(q_name)
        first_name,last_name, color = cursor.fetchone()
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()
        name = ' '.join([first_name, last_name])
        d = {"name": name, "color": color}
        members.append(d)

    if (tripinfo[5] != None):
        mems = tripinfo[5].split(',')
        for m in mems:
            q_name = "select first_name, last_name, color from users where email = '{}'".format(m)
            cursor.execute(q_name)
            first_name,last_name,color = cursor.fetchone()
            first_name = first_name.capitalize()
            last_name = last_name.capitalize()
            name = ' '.join([first_name, last_name])
            d = {"name": name, "color": color}
            members.append(d)

    a_list = []
    if (tripinfo[6] != None):
        attractions = tripinfo[6].split(',')
        for a in attractions:
            d = {}
            q_attraction = "select name, photo_link, website from locations where loc_id = {}".format(int(a))
            cursor.execute(q_attraction)
            name, photo_link, website = cursor.fetchone()
            d['name'] = name
            d['photo_link'] = photo_link
            d['website'] = website
            a_list.append(d)

    ret['trip_name'] = tripinfo[1]
    ret['city'] = city
    ret['country'] = country
    ret['start'] = str(tripinfo[3])
    ret['end'] = str(tripinfo[4])
    ret['members'] = members
    ret['selected_attractions'] = a_list
    # ret['voting_attractions'] = tripinfo[7]

    return ret

def get_destinations():
    q_dest = "select city, country from destinations"
    cursor.execute(q_dest)
    dests = cursor.fetchall()
    final_dests = []
    for city, country in dests:
        place = city + ', ' + country
        final_dests.append(place)
    return final_dests
    
def get_attractions(city, country, uid):
    q_att = "select name, photo_link, website from locations where city = '{}' and country = '{}'".format(city, country)
    cursor.execute(q_att)
    attractions = cursor.fetchall()
    att_list = []
    for name, photo_link, website in attractions:
        d = {}
        d["name"] = name
        d["photo_link"] = photo_link
        d["website"] = website
        att_list.append(d)

    q_email = "select email from users where user_id = {}".format(uid)
    cursor.execute(q_email)
    email = cursor.fetchone()[0]
    q_destid = "select dest_id from destinations where city = '{}' and country = '{}'".format(city, country)
    cursor.execute(q_destid)
    locid = cursor.fetchone()[0]
    q_trips = "select trip_id, tripname from trips where loc_id = {} and (user_id  = {} or members like '%{}%')".format(locid, uid, email)
    cursor.execute(q_trips)
    trips = cursor.fetchall()
    trip_list = []
    for trip_id, tripname in trips:
        d = {}
        d["trip_id"] = trip_id
        d["tripname"] = tripname
        trip_list.append(d)

    return att_list, trip_list

def addAttraction_trip(uid, trip_id, attraction_name):
    print(uid, trip_id, attraction_name)