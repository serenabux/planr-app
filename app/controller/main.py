from flask import (
    Blueprint, render_template, request, flash, url_for, redirect, jsonify
)
import flask

#Imports of external python scrips
#sys used to create direct path using
#build tree
import sys
sys.path.append('../../')
import new_user
import sign_in 
import user_pull

bp = Blueprint('main', __name__)


@bp.route('/')
def index():
    return render_template('main/index.html',
                           title='Flask-PWA')

@bp.route('/sign_up')
def sign_up():
    return render_template('main/sign_up.html', title='Sign Up')

@bp.route('/sign_up_user', methods=['POST'])
def sign_up_user():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    email = request.form['email']
    password1 = request.form['password1']
    password2 = request.form['password2']
    ret = new_user.create_user(email, firstname, lastname, password1, password2)
    if(ret == -2):
        flash("User already exists.")
        return render_template('main/sign_in.html', title='Sign In')
    elif(ret == -4):
        flash("Passwords do not match")
        return render_template('main/sign_up.html', title='Sign Up')
    else:
        return render_template('main/sign_in.html', title='Sign In')
        # return render_template('main/main_dashboard.html', title='Main Dashboard')

@bp.route('/sign_in_user', methods=['POST'])
def sign_in_user():
    email = request.form['email']
    password = request.form['password']
    ret = sign_in.new_user(email, password)
    if(ret == -1):
        flash("Invalid email or password. Please try again.")
        return render_template('main/sign_in.html', title='Sign In')
    else:
        uid = sign_in.get_id(email)
        if(uid == -1):
            uid = None
        return redirect(url_for('main.main_dashboard', uid = uid))

@bp.route('/sign_in')
def sign_in_page():
    return render_template('main/sign_in.html', title='Sign In')

@bp.route('/main_dashboard/', defaults = {'uid': None})
@bp.route('/main_dashboard/<uid>')
def main_dashboard(uid):
    if(uid == None):
        return redirect(url_for('main.sign_in'))
    else:   
        name = user_pull.get_name(uid)
        return render_template('main/main_dashboard.html', name = name, uid = uid)

@bp.route('/trip_dashboard/', defaults = {'uid': None})
@bp.route('/trip_dashboard/<uid>')
def trip_dashboard(uid):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    else:
        trip = user_pull.get_upcoming_trips(uid)
        return render_template('main/trip_dashboard.html', trip = trip, uid = uid)

@bp.route('/delete_trip/<uid>/<trip_id>/', defaults = {'uid': None, 'trip_id': None})
@bp.route('/delete_trip/<uid>/<trip_id>/')
def delete_trip(uid,trip_id):
    if(trip_id == None or uid == None):
        return "false"
    else:
        #delete trip from database, return true if works, false if not
        user_pull.delete_trip(uid, trip_id)
        return "true"



@bp.route('/trip_page/', defaults = {'uid': None, 'trip_id': None})
@bp.route('/trip_page/<uid>/<trip_id>')
def trip_page(uid,trip_id):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    elif(trip_id == None):
        return redirect(url_for('main.trip_dashboard', uid = uid))
    else:
        #this line here is trip info -- will be changing when attractions come in
        trip_info = user_pull.get_trip_info(uid, trip_id)
        return render_template('main/trip_page.html', trip_id = trip_id, uid = uid, trip_info = trip_info)

@bp.route('/create_trip/', defaults = {'uid': None})
@bp.route('/create_trip/<uid>')
def create_trip(uid):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    else:
        return render_template('main/create_trip.html', uid = uid)


@bp.route('/create_trip_data/<uid>/<num_friends>', methods=['POST'])
def create_trip_data(uid, num_friends):
    name = request.form['trip_name']
    location = request.form['trip_destination']
    dates = request.form['date_range']
    split_dates = dates.split(" - ")
    start = split_dates[0]
    end = split_dates[1]
    i = 0
    invitees = []
    while i < int(num_friends) + 1:
        if request.form['invite_friend_' + str(i)] != "":
            invitees.append(request.form['invite_friend_' + str(i)])
        i += 1
    valid_name = user_pull.validate_name(uid, name)
    if(valid_name == -1):
        return render_template('main/create_trip.html', uid = uid, message = "Invalid name - Cannot have same name trips")
    elif(len(invitees)):
        for p in invitees:
            if(user_pull.validate_invitee(p) == -1):
                return render_template('main/create_trip.html', uid = uid, message = "Invalid invitees")
    trip_id = user_pull.add_trip(uid, name, location, start, end, invitees)
    trip_info = user_pull.get_trip_info(uid, trip_id)
    return render_template('main/trip_page.html', uid = uid, trip_info = trip_info, trip_id = trip_id)

@bp.route('/explore/', defaults = {'uid': None, 'trip_id': None, 'trip_name': None, 'city': None, 'country': None})
@bp.route('/explore/<uid>/', defaults = {'trip_id': None, 'trip_name': None, 'city': 'Paris', 'country': 'France'})
@bp.route('/explore/<uid>/<city>/<country>', defaults = {'trip_id': None, 'trip_name': None})
@bp.route('/explore/<uid>/<trip_id>/<trip_name>/<city>/<country>')
def explore(uid,trip_id, trip_name, city, country):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    else:
        #If city and country exists then query for that location 
        #Otherwise query for Paris, France it is the default
        #If possible also return any trip ids and trip name that have the location Paris, France 
        attractions_list, trip_list = user_pull.get_attractions(city, country, uid)
        return render_template('main/explore.html', uid = uid, trip_id = trip_id, trip_name = trip_name, city = city, country = country, attractions = attractions_list, trip_list = trip_list)

@bp.route('/explore_new/<uid>/<city>/<country>/')
@bp.route('/explore_new/', defaults = {'uid': None, 'city': None, 'country': None})
@bp.route('/explore_new/<uid>/', defaults = {'city': None, 'country': None})
def explore_new(uid, city, country):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    elif(city == None or country == None):
        return redirect(url_for('main.explore', uid = uid))
    else:
        #Query for the location and return a list of attractions
        #If possible return any trip_ids and trip names that correspond to the given location 
        attractions_list, trip_list = user_pull.get_attractions(city, country, uid)
        explore_data = {"attractions": attractions_list, "trip_list": trip_list}
        return jsonify(explore_data)

@bp.route('/add_attraction/<uid>/<trip_id>/<attraction_name>/')
@bp.route('/add_attraction/', defaults = {'uid': None, 'trip_id': None, 'attraction_name': None})
@bp.route('/add_attraction/<uid>', defaults = {'trip_id': None, 'attraction_name': None})
def add_attraction(uid, trip_id, attraction_name):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    elif(trip_id == None or attraction_name == None):
        return "false"
    else:
        user_pull.addAttraction_trip(uid, trip_id, attraction_name)
        return "true"

@bp.route('/delete_attraction/<uid>/<trip_id>/<attraction_name>/')
@bp.route('/delete_attraction/', defaults = {'uid': None, 'trip_id': None, 'attraction_name': None})
def delete_attraction(uid, trip_id, attraction_name):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    elif(trip_id == None or attraction_name == None):
        return "false"
    else:
        #delete the attraction from this trip
        return "true"

@bp.route('/credits/<uid>/')
@bp.route('/credits/', defaults = {'uid': None})
def credits(uid):
    if(uid == None):
        return redirect(url_for('main.sign_in_page'))
    return render_template('main/credits.html', uid = uid)