from flask import Blueprint, jsonify, request
from app.models import db, Post, Character
from flask_jwt_extended import jwt_required
from sqlalchemy import desc
import json
import datetime
# pylint: skip-file

posts = Blueprint('posts', __name__, url_prefix='/api/posts')


@posts.route('/create', methods=['POST'])
@jwt_required
def create_post():
    incoming = request.get_json()

    new_post = Post(
        character_id=incoming['character_id'],
        title=incoming['title'],
        content=incoming['content'],
        most_used_words=incoming['content'],
        like_count=0,
        created_at=datetime.datetime.now()
    )

    db.session.add(new_post)

    try:
        db.session.commit()
    except:
        return {'msg':'Please fill in all fields'}, 400

    return jsonify(new_post.to_dict())


@posts.route('/newest-posts/<int:page>')
@jwt_required
def newests_posts(page):
    posts = Post.query.order_by(desc('created_at')).offset(page*10).limit(10).all()

    count = get_post_count()

    posts_data = [post.to_dict() for post in posts]
    posts_data.append({ 'count': count })

    return jsonify(posts_data)

def get_post_count():
    return Post.query.count()


@posts.route('/<int:id>')
@jwt_required
def get_post(id):
    post = Post.query.get(id)

    return jsonify(post.to_dict())


@posts.route('/character/<int:id>')
@jwt_required
def get_char_posts(id):
    posts = Post.query.filter_by(character_id=id).order_by(desc('created_at')).all()

    return jsonify([post.to_dict() for post in posts])


@posts.route('/related/<int:id>')
@jwt_required
def get_related(id):
    current_post = Post.query.get(id)

    most_used = json.loads(current_post.most_used_words)

    similar = []

    for key, value in most_used.items():
        res = Post.query.filter(Post._most_used_words.like(f'%{key}%'), Post.id != id).all()
        similar.extend([post.to_dict() for post in res])

    res_list = [post_dict for post, post_dict in enumerate(similar) if post_dict not in similar[post + 1:]]

    return jsonify(res_list)