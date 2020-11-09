from flask import Blueprint, jsonify, request, redirect
from flask_jwt_extended import create_access_token
from app.models import db, User

# pylint: skip-file

bp = Blueprint('auth', __name__, url_prefix='')

@bp.route('/signup', methods=['POST'])
def signup():
    incoming = request.get_json()

    user = User(
        username = incoming['username'],
        email = incoming['email'],
        password = incoming['password']
    )

    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message='User with that email or username already exists'), 409

    token = create_access_token(identity=user.username)
    return jsonify(user=user.to_dict(), token=token)


@bp.route('/login', methods=['POST'])
def login():
    incoming = request.get_json()
    user = User.query.filter_by(username=incoming['username']).first()

    if user and user.check_password(incoming['password']):
        token = create_access_token(identity=user.username)
        return jsonify(user=user.to_dict(), token=token)
    else:
        return {'msg': 'Incorrect email or password'}, 400
