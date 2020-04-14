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

def delete_trip(trip_id):
    q_delete = "delete from trips where trip_id = {}".format(trip_id)
    cursor.execute(q_delete)
    conn.commit()

def get_trip_info(uid, trip_id):
    uid = int(uid)
    # tripname, loc_id, trip_start, trip_end, members, selected_attractions, voting_attractions
    ret = {}
    q_tripinfo = "select user_id, tripname, loc_id, trip_start, trip_end, members, selected_attractions, voting_attractions from trips where trip_id = {}".format(trip_id)
    cursor.execute(q_tripinfo)
    tripinfo = cursor.fetchone()
    print("Input uid: ",uid)
    print(tripinfo)

    q_location = "select city, country from destinations where dest_id = {}".format(tripinfo[2])
    cursor.execute(q_location)
    city, country = cursor.fetchone()

    members = []
    if (tripinfo[0] == uid):
        q_name = "select first_name, last_name from users where user_id = {}".format(uid)
        cursor.execute(q_name)
        first_name,last_name = cursor.fetchone()
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()
        name = ' '.join([first_name, last_name])
        members.append(name)
    else:
        q_name = "select first_name, last_name from users where user_id = {}".format(tripinfo[0])
        cursor.execute(q_name)
        first_name,last_name = cursor.fetchone()
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()
        name = ' '.join([first_name, last_name])
        members.append(name)

    if (tripinfo[5] != None):
        mems = tripinfo[5].split(',')
        for m in mems:
            q_name = "select first_name, last_name from users where email = '{}'".format(m)
            cursor.execute(q_name)
            first_name,last_name = cursor.fetchone()
            first_name = first_name.capitalize()
            last_name = last_name.capitalize()
            name = ' '.join([first_name, last_name])
            members.append(name)

    a_list = []
    if (tripinfo[6] != None):
        attractions = tripinfo[6].split(',')
        for a in attractions:
            d = {}
            q_attraction = "select name from locations where loc_id = {}".format(int(a))
            cursor.execute(q_attraction)
            name = cursor.fetchone()[0]
            d['name'] = name
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