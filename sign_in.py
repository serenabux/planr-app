import json
from passlib.context import CryptContext
import psycopg2
import sys

def new_user(email, password):
	#Non-encrypting information
	email = email.lower()

	try:
		conn = psycopg2.connect(host = "ec2-23-20-129-146.compute-1.amazonaws.com", 
								database = "d3dcr472e5h2ct", 
								user = "neaxjuhlihfatr", 
								password = "2d3bd53ead754250b40caf5c639e596c3100a98525137764af660696765b0b4a", 
								port = "5432")
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
		conn = psycopg2.connect(host = "ec2-23-20-129-146.compute-1.amazonaws.com", 
								database = "d3dcr472e5h2ct", 
								user = "neaxjuhlihfatr", 
								password = "2d3bd53ead754250b40caf5c639e596c3100a98525137764af660696765b0b4a", 
								port = "5432")
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