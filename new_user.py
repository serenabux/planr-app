from passlib.context import CryptContext
import psycopg2
import sys


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
		conn = psycopg2.connect(host = "ec2-23-20-129-146.compute-1.amazonaws.com", 
								database = "d3dcr472e5h2ct", 
								user = "neaxjuhlihfatr", 
								password = "2d3bd53ead754250b40caf5c639e596c3100a98525137764af660696765b0b4a", 
								port = "5432")
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
			query_insert = "insert into users (email, first_name, last_name, date_created, password) VALUES ('{}', '{}', '{}', CURRENT_DATE,'{}')".format(email, first_name, last_name, hashed_pw)	
		
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

