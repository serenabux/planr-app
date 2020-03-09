from flask import (
    Blueprint, render_template
)

import sys

sys.path.append('../../')
import new_user

bp = Blueprint('main', __name__)


@bp.route('/')
def index():
    return render_template('main/index.html',
                           title='Flask-PWA')
@bp.route('/sign_up')
def sign_up():
    return render_template('main/sign_up.html', title='Sign Up')

@app.route('/new_user', methods=['POST'])
def new_user():
    data = request.form
    print(data)


@bp.route('/sign_in')
def test():
    return render_template('main/sign_in.html', title='Sign In')