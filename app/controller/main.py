from flask import (
    Blueprint, render_template, request
)

import sys

sys.path.append('../../')
import new_user
import sys
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
    print("HELLo")
    data = request.form
    print(data)
    return "<h1> HI </h1>"

@bp.route('/sign_in_user', methods=['POST'])
def sign_in_user():
    print("HELLo")
    data = request.form
    print(data)
    return "<h1> Hi2 </h1>"


@bp.route('/sign_in')
def test():
    return render_template('main/sign_in.html', title='Sign In')