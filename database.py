# pylint: skip-file

from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Character, Post, Like, follows
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
        name='fakechar1',
        bio='The first seeded character',
        class_name='Mage',
    )

    character2 = Character(
        user_id=2,
        name='fakechar2',
        bio='The second seeded character',
        class_name='Barbarian'
    )

    character3 = Character(
        user_id=3,
        name='fakechar3',
        bio='The third seeded character',
        class_name='Warlock',
        followers=[character1, character2]
    )

    character4 = Character(
        user_id=1,
        name='fakechar4',
        bio='The fourth seeded character',
        class_name='Monk'
    )

    post1 = Post(
        character_id=1,
        title='First seeded post',
        content=content1,
        most_used_words=content1,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post2 = Post(
        character_id=2,
        title='Second seeded post',
        content=content2,
        most_used_words=content2,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post3 = Post(
        character_id=3,
        title='Third seeded post',
        content=content3,
        most_used_words=content3,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    post4 = Post(
        character_id=4,
        title='Fourth seeded post',
        content=content4,
        most_used_words=content4,
        like_count=0,
        created_at=datetime.datetime.now()
    )

    # follow1 = follows(
    #     leader_id=1,
    #     follower_id=2
    # )

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

    # db.session.add(follow1)

    db.session.commit()