from flask import Blueprint, jsonify, request
from app.models import db, Post, Character
from flask_jwt_extended import jwt_required
from sqlalchemy import desc

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


@posts.route('/newest-posts/<int:page>')
@jwt_required
def newests_posts(page):
    posts = Post.query.order_by(desc('created_at')).offset(page*10).limit(10).all()

    count = Post.query.count()

    posts_data = [post.to_dict() for post in posts]
    posts_data.append({ 'count': count })
    return jsonify(posts_data)
