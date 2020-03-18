import json
from passlib.context import CryptContext
import psycopg2
import sys
import DB_manager

def new_user(email, password):
	#Non-encrypting information
	email = email.lower()

	try:
		conn = psycopg2.connect(host = DB_manager.get_hostname(), 
                        database = DB_manager.get_database(), 
                        user = DB_manager.get_user(), 
                        password = DB_manager.get_password(), 
                        port = DB_manager.get_port())
		cursor = conn.cursor()
		query_valid = "select count(*) from users where email = \'" + email + "\'"
		cursor.execute(query_valid)
		num = cursor.fetchone()[0]
		if(num != 1):
			return -1

		query_get_pass = "select password from users where email = \'" + email + "\'"
		cursor.execute(query_get_pass)
		hashed_pw = cursor.fetchone()[0]
		pwd_context = CryptContext(schemes=["pbkdf2_sha256"],
									default = "pbkdf2_sha256",
									pbkdf2_sha256__default_rounds=30000)
		if(pwd_context.verify(password.encode("utf8"), hashed_pw)):
			return 0
		else:
			return -1

	except (Exception, psycopg2.Error) as error:
		#DATABASE CONNECTION/OTHER JSON ERROR CODE
		return -1
	finally:
		if(conn):
			conn.commit()
			cursor.close()
			conn.close()

def get_id(email):
	email = email.lower()
	try:
		conn = psycopg2.connect(host = DB_manager.get_hostname(), 
                        database = DB_manager.get_database(), 
                        user = DB_manager.get_user(), 
                        password = DB_manager.get_password(), 
                        port = DB_manager.get_port())
		cursor = conn.cursor()
		q = "select user_id from users where email = '{}'".format(email)
		cursor.execute(q)
		return cursor.fetchone()[0]
	except (Exception, psycopg2.Error) as error:
		#DATABASE CONNECTION/OTHER JSON ERROR CODE
		return -1
	finally:
		if(conn):
			conn.commit()
			cursor.close()
			conn.close()