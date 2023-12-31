"""empty message

Revision ID: 73f9e47fa3b4
Revises: f121987af9a1
Create Date: 2023-09-09 20:49:49.613431

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '73f9e47fa3b4'
down_revision: Union[str, None] = 'f121987af9a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profiles', sa.Column('positions', sa.JSON(), nullable=True))
    op.add_column('profiles', sa.Column('competences', sa.JSON(), nullable=True))
    op.drop_column('profiles', 'competence')
    op.drop_column('profiles', 'position')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profiles', sa.Column('position', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('competence', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('profiles', 'competences')
    op.drop_column('profiles', 'positions')
    # ### end Alembic commands ###
