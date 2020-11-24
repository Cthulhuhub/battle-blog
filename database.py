# pylint: skip-file

from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Character, Post, Like, follows, Comment
from gensim.parsing.preprocessing import remove_stopwords
from collections import Counter
import datetime

content1 = 'Him rendered may attended concerns jennings reserved now. Sympathize did now preference unpleasing mrs few. Mrs for hour game room want are fond dare. For detract charmed add talking age. Shy resolution instrument unreserved man few. She did open find pain some out.'

content2 = 'Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it. Farther be chapter at visited married in it pressed. By distrusts procuring be oh frankness existence believing instantly if. Doubtful on an juvenile as of servants insisted.'

content3 = 'In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add.'

content4 = 'Mind what no by kept. Celebrated no he decisively thoroughly. Our asked sex point her she seems. New plenty she horses parish design you.'

with app.app_context():
    db.drop_all()
    db.create_all()

    user1 = User(
        username='fakeuser1',
        email='fake1@email.com',
        password='fakepassword1'
    )

    user2 = User(
        username='fakeuser2',
        email='fake2@email.com',
        password='fakepassword2'
    )

    user3 = User(
        username='fakeuser3',
        email='fake3@email.com',
        password='fakepassword3'
    )

    character1 = Character(
        user_id=1,
        name='Crookedwood',
        bio='The first seeded character',
        class_name='Mage',
    )

    character2 = Character(
        user_id=2,
        name='Evanobby Barnerty',
        bio='The second seeded character',
        class_name='Barbarian'
    )

    character3 = Character(
        user_id=3,
        name='Slimeleman',
        bio='The third seeded character',
        class_name='Warlock',
        followers=[character1, character2]
    )

    character4 = Character(
        user_id=1,
        name='Hansenvine Butlerwalker',
        bio='The fourth seeded character',
        class_name='Monk'
    )

    post1 = Post(
        character_id=1,
        title='Shield of Fire',
        content=content1  + ' banana banana banana banana banana banana',
        most_used_words=content1   + ' banana banana banana banana banana banana',
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post2 = Post(
        character_id=2,
        title='Dragon\'s Grave',
        content=content2  + ' banana banana banana banana banana banana',
        most_used_words=content2   + ' banana banana banana banana banana banana',
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post3 = Post(
        character_id=3,
        title='The Blood in the Wind',
        content=content3,
        most_used_words=content3,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post4 = Post(
        character_id=4,
        title='Tower of Poseidon',
        content=content4,
        most_used_words=content4,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post5 = Post(
        character_id=1,
        title='Titan\'s Oath',
        content=content1,
        most_used_words=content1,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post6 = Post(
        character_id=2,
        title='Sword of Hippolyta',
        content=content2,
        most_used_words=content2,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post7 = Post(
        character_id=3,
        title='North of Crows',
        content=content3,
        most_used_words=content3,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post8 = Post(
        character_id=4,
        title='The Prophecy in the Mist',
        content=content4,
        most_used_words=content4,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post9 = Post(
        character_id=1,
        title='The Seer of Dark',
        content=content1,
        most_used_words=content1,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post10 = Post(
        character_id=2,
        title='Thief of Six',
        content=content2,
        most_used_words=content2,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post11 = Post(
        character_id=3,
        title='The Time of the Cursed',
        content=content3,
        most_used_words=content3,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    comment1 = Comment(
        character_id=1,
        post_id=1,
        content="Leading the way mate.",
        created_at=datetime.datetime.now()
    )

    comment2 = Comment(
        character_id=2,
        post_id=1,
        content="I want to learn this kind of boldness! Teach me.",
        created_at=datetime.datetime.now()
    )

    comment3 = Comment(
        character_id=3,
        post_id=2,
        content="Radiant work you have here.",
        created_at=datetime.datetime.now()
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    db.session.add(character1)
    db.session.add(character2)
    db.session.add(character3)
    db.session.add(character4)

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()