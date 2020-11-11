from flask import Blueprint, jsonify, request
from app.models import db, Character
from flask_jwt_extended import jwt_required

# pylint: skip-file

chars = Blueprint('chars', __name__, url_prefix='/api/chars')


@chars.route('/<int:id>')
@jwt_required
def user_chars(id):
    characters = Character.query.filter_by(user_id=id).all()

    return jsonify(characters=[character.to_dict() for character in characters])


@chars.route('/details/<int:id>')
@jwt_required
def char_details(id):

    character = Character.query.filter_by(id=id).one()

    print(character)

    return jsonify(character.to_dict())


@chars.route('/create', methods=['POST'])
@jwt_required
def create_char():
    incoming = request.get_json()

    new_char = Character(
        user_id=incoming['user_id'],
        name=incoming['name'],
        bio=incoming['bio'],
        class_name=incoming['class_name'],
        follower_count=0
    )

    db.session.add(new_char)

    try:
        db.session.commit()
    except:
        return {'msg': 'Please fill in all fields'}, 400

    return jsonify(new_char.to_dict()), 200