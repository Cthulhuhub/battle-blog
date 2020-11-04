"""empty message

Revision ID: bfab7777f412
Revises: 
Create Date: 2020-11-03 07:56:34.817468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bfab7777f412'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('characters', sa.Column('follower_count', sa.Integer(), nullable=True))
    op.drop_column('characters', 'like_count')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('characters', sa.Column('like_count', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('characters', 'follower_count')
    # ### end Alembic commands ###