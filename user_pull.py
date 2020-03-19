import json
from passlib.context import CryptContext
import psycopg2
import sys
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
