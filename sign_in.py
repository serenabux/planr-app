import json
from passlib.context import CryptContext
import psycopg2
import sys

 

def new_user():
	user = {"Email": "TEst5@test.com","Password": "testpass"}

	#Non-encrypting information
	email = user["Email"].lower()


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
		if(num != 1):
			print("NO USER EXISTS - EMAIL DOESN'T EXIST")
			return -2

		query_get_pass = "select password from users where email = \'" + email + "\'"
		cursor.execute(query_get_pass)
		hashed_pw = cursor.fetchone()[0]
		print(hashed_pw)
		pwd_context = CryptContext(schemes=["pbkdf2_sha256"],
									default = "pbkdf2_sha256",
									pbkdf2_sha256__default_rounds=30000)
		if(pwd_context.verify(user["Password"].encode("utf8"), hashed_pw)):
			print("CORRECT PASSWORD")
		else:
			print("INCORRECT PASSWORD")

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

def main():
	new_user()

if __name__ == '__main__':
	main()