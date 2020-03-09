import os
import psycopg2
import json
import requests
from flask import jsonify 
# geometry->location->lat and long, name, 
# photos->photo_reference, opening_hours->open_now, types
def do_it(k, cursor):
	api_key = "AIzaSyBuA4VK2yQ2pzac_mEECzjvsuTJhpEcv4k"
	url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
	query = "Attractions in " + k
	req = requests.get(url + 'query=' + query + '&key=' + api_key)
	x = req.json()
	y = x['results']
	attractions = []
	for i in range(5):
		name = y[i]['name'].replace('\'', '')
		lat = y[i]['geometry']['location']['lat']
		lng = y[i]['geometry']['location']['lng']
		photo_reference = y[i]['photos'][0]["photo_reference"]
		types = ','.join(y[i]['types'])

		city,country = k.split(',')
		insert = "INSERT INTO locations (city, country, name, lat, lng, photo_link, type) VALUES\
			('{}', '{}', '{}', {}, {}, '{}', '{}')".format(city, country, name, lat, lng, photo_reference, types)
		cursor.execute(insert)

def main():
	try:
		connection = psycopg2.connect( user = "zkjphkaesmnrrh",
									   password = "768f0dd94bb303647eb7f1571e32222caf0697acad66af9323474a883fa22a29",
									   host = "ec2-54-197-48-79.compute-1.amazonaws.com",
									   port = "5432",
									   database = "ds0v3p1cohl5b" )
		cursor = connection.cursor()
		locations = ["Paris,France",
			  "Barcelona,Spain",
			  "Sydney,Australia",
			  "Madrid,Spain",
			  "New York City,United States",
			  "London,England",
			  "Bangkok,Thailand",
			  "Rome,Italy",
			  "Los Angeles,United States",
			  "Toronto,Canada"]
		for l in locations:
			insert = do_it(l, cursor)
			# cursor.execute(insert)

	except (Exception, psycopg2.Error) as error:
		print("Error connecting to postgreSQL:", error)

	finally:
		if(connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("Connection is closed", "\n")

	
		


if __name__ == '__main__':
	main()
