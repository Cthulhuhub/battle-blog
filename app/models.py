#pylint: skip-file

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from gensim.parsing.preprocessing import remove_stopwords
from collections import Counter


db = SQLAlchemy()


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

    creator = db.relationship('User')
    posts = db.relationship('Post')
    # follows = db.relationship('Follow')
    likes = db.relationship('Like', secondary='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'bio': self.bio,
            'class_name': self.class_name,
            'creator': self.creator.to_dict()
        }


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    most_used_words = db.Column(db.String(), nullable=False)
    like_count = db.Column(db.Integer, nullable=False)

    @property
    def like_count(self):
        return self.like_count

    @like_count.setter
    def like_count(self, up_or_down):
        if up_or_down is 'up':
            self.like_count += 1
        elif up_or_down is 'down':
            self.like_count -= 1

    @property
    def most_used_words(self):
        return self.most_used_words

    @most_used_words.setter
    def most_used_words(self):
        filtered_words = remove_stopwords(self.content)
        words = filtered_words.split()
        counter = Counter(words)
        return dict(counter.most_common(5))


    author = db.relationship('Character')
    likes = db.relationship('Character', secondary="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'title': self.title,
            'content': self.content,
            'most_used_words': self.most_used_words,
            'like_count': self.like_count,
            'author': self.author.to_dict()
        }


class Like(db.Model):
    __tablename__ = 'likes'

    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), primary_key=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True, nullable=False)

    character = db.relationship('Character', backref=backref('likes', cascade='all, delete-orphan'))
    post = db.relationship('Post', backref=backref('likes', cascade='all, delete-orphan'))


class Follow(db.Model):
    __tablename__ = 'follows'

    follower_id = db.Column(db.Ineger, db.ForeignKey('characters.id'), primary_key=True, nullable=False)
    leader_id = db.Column(db.Integer, db.ForeignKey('characters.id'), primary_key=True, nullable=False)

    follower = db.relationship('Character', backref=backref('likes', cascade='all, delete-orphan'))
    leader = db.relationship('Character', backref=backref('likes', cascade='all, delete-orphan'))