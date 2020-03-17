import json
from passlib.context import CryptContext
import psycopg2
import sys

conn = psycopg2.connect(host = "ec2-23-20-129-146.compute-1.amazonaws.com", 
                        database = "d3dcr472e5h2ct", 
                        user = "neaxjuhlihfatr", 
                        password = "2d3bd53ead754250b40caf5c639e596c3100a98525137764af660696765b0b4a", 
                        port = "5432")
cursor = conn.cursor()

def get_name(uid):
    q = "select first_name from users where user_id = '{}'".format(uid)
    cursor.execute(q)
    name = cursor.fetchone()[0].capitalize()
    return name

def get_trips(em):
    q = "select * from trips where user_id = (select user_id from users where email = '{}') or members like '%{}%'".format(em, em)
    cursor.execute(q)
    trips = cursor.fetchall()
    creators = []
    for trip in trips:
        uid = trip[2]
        q2 = "select first_name, last_name from users where user_id = {}".format(uid)
        cursor.execute(q2)
        ret = cursor.fetchall()
        creators.append(ret[0])
    return trips, creators
