import json
from passlib.context import CryptContext
import psycopg2
import sys

conn = psycopg2.connect(host = "ec2-54-197-48-79.compute-1.amazonaws.com", 
                        database = "ds0v3p1cohl5b", 
                        user = "zkjphkaesmnrrh", 
                        password = "768f0dd94bb303647eb7f1571e32222caf0697acad66af9323474a883fa22a29", 
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
