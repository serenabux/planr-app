from flask import (
    Blueprint, render_template, request, flash,
)
import flask

#Imports of external python scrips
#sys used to create direct path using
#build tree
import sys
sys.path.append('../../')
import new_user
import sign_in 

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
        return render_template('main/main_dashboard.html', title='Main Dashboard')

@bp.route('/sign_in_user', methods=['POST'])
def sign_in_user():
    email = request.form['email']
    password = request.form['password']
    ret = sign_in.new_user(email, password)
    if(ret == -1):
        flash("Invalid email or password. Please try again.")
        return render_template('main/sign_in.html', title='Sign In')
    else:
       return render_template('main/main_dashboard.html', title='Flask-PWA')

@bp.route('/sign_in')
def test():
    return render_template('main/sign_in.html', title='Sign In')