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
		conn = psycopg2.connect(host = "ec2-54-197-48-79.compute-1.amazonaws.com", 
								database = "ds0v3p1cohl5b", 
								user = "zkjphkaesmnrrh", 
								password = "768f0dd94bb303647eb7f1571e32222caf0697acad66af9323474a883fa22a29", 
								port = "5432")
		cursor = conn.cursor()
		query_valid = "select count(*) from users where email = \'" + email + "\'"
		print(query_valid)
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
			print(hashed_pw)
			query_insert = "insert into users (email, first_name, last_name, date_created, password) VALUES ('{}', '{}', '{}', CURRENT_DATE,'{}')".format(email, first_name, last_name, hashed_pw)	
		
			cursor.execute(query_insert)
		else:
			return -4
		return 0

	except (Exception, psycopg2.Error) as error:
		print(error)
		#DATABASE CONNECTION/OTHER JSON ERROR CODE
		return -1
	finally:
		if(conn):
			conn.commit()
			cursor.close()
			conn.close()
			print("connection closed")

