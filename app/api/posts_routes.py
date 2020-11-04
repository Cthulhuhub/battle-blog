from flask import Blueprint, jsonify, request
from app.models import db, Post, Character, Follow
from flask_jwt_extended import jwt_required

# pylint: skip-file

posts = Blueprint('posts', __name__, url_prefix='/api/posts')


@posts.route('/create', methods=['POST'])
@jwt_required
def create_post():
    incoming = request.json()

    new_post = Post(
        character_id=incoming['character_id'],
        title=incoming['title'],
        content=incoming['content'],
        most_used_words=incoming['content'],
        like_count=0
    )

    db.session.add(new_post)

    try:
        db.session.commit()
    except IntegrityError:
        return {'msg':'Please fill in all fields'}, 400

    return jsonify(new_post.to_dict())