from passlib.context import CryptContext
import psycopg2
import sys
import DB_manager
import random

def create_user(email, first_name, last_name, password1, password2):
	# print(user)
	#Non-encrypting information
	# email = user["email"].lower()
	# first_name = user["firstname"].lower()
	# last_name = user["lastname"].lower()
	email = email.lower()
	first_name = first_name.lower()
	last_name = last_name.lower()

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
		if(num > 0):
			#USER EXISTS ERROR CODE
			return -2
		if(password1 == password2):
			pwd_context = CryptContext(schemes=["pbkdf2_sha256"],
										default = "pbkdf2_sha256",
										pbkdf2_sha256__default_rounds=30000)
			hashed_pw = pwd_context.encrypt(password2)
			hex_num = "#{:06x}".format(random.randint(0,0xFFFFFF))
			query_insert = "insert into users (email, first_name, last_name, date_created, password, color) VALUES ('{}', '{}', '{}', CURRENT_DATE,'{}', '{}')".format(email, first_name, last_name, hashed_pw, hex_num)	
		
			cursor.execute(query_insert)
		else:
			return -4
		return 0

	except (Exception, psycopg2.Error) as error:
		#DATABASE CONNECTION/OTHER JSON ERROR CODE
		return -1
	finally:
		if(conn):
			conn.commit()
			cursor.close()
			conn.close()

