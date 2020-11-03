from flask import Blueprint, jsonify, request
from app.models import db, Character
from flask_jwt_extended import jwt_required

chars = Blueprint('chars', __name__, url_prefix='/api/chars')

@chars.route('/<int:id>')
@jwt_required
def user_chars(id):

    characters = Character.query.filter_by(user_id=id)

    print(characters)

    return jsonify(characters=[characters.to_dict() for character in characters])

@chars.route('/details/<int:id>')
@jwt_required
def char_details(id):

    character = Character.query.filter_by(id=id).one()