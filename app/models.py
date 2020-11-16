#pylint: skip-file

import json
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from gensim.parsing.preprocessing import remove_stopwords
from collections import Counter


db = SQLAlchemy()

follows = db.Table('follows',
    db.Column('leader_id', db.Integer, db.ForeignKey('characters.id'), primary_key=True),
    db.Column('follower_id', db.Integer, db.ForeignKey('characters.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    characters = db.relationship('Character')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        if len(password) > 8 and len(password) < 50:
            self.hashed_password = generate_password_hash(password)
        else:
            raise AssertionError('Password must be at leat 8 characters, but no longer than 50')

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Character(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(500), nullable=False)
    class_name = db.Column(db.String(50), nullable=False)
    follower_count = db.Column(db.Integer)


    creator = db.relationship('User')
    posts = db.relationship('Post')

    followers = db.relationship('Character',
        secondary=follows,
        backref=db.backref('leaders'),
        primaryjoin=id==follows.c.leader_id,
        secondaryjoin=id==follows.c.follower_id
    )

    likes = db.relationship('Like', back_populates='character')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'bio': self.bio,
            'class_name': self.class_name,
            'follower_count': self.follower_count,
            'creator': self.creator.to_dict()
        }


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    content = db.Column(db.String(10000), nullable=False)
    _most_used_words = db.Column(db.String(), nullable=False)
    _like_count = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    @property
    def like_count(self):
        return self._like_count

    @property
    def most_used_words(self):
        return self._most_used_words


    @like_count.setter
    def like_count(self, num):
        self._like_count = num


    @most_used_words.setter
    def most_used_words(self, content):
        filtered_words = remove_stopwords(content)
        words = filtered_words.split()
        counter = Counter(words)
        self._most_used_words = json.dumps(dict(counter.most_common(5)))


    author = db.relationship('Character')
    likes = db.relationship('Like', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'title': self.title,
            'content': self.content,
            'most_used_words': self.most_used_words,
            'like_count': self.like_count,
            'created_at': self.created_at,
            'author': self.author.to_dict()
        }


class Like(db.Model):
    __tablename__ = 'likes'

    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), primary_key=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True, nullable=False)

    character = db.relationship('Character', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')


# class Follow(db.Model):
#     __tablename__ = 'follows'

#     leader_id = db.Column(db.Integer, db.ForeignKey('characters.id'), primary_key=True)
#     follower_id = db.Column(db.Integer, primary_key=True)

#     leader = db.relationship('Character', backref=db.backref('follows'))