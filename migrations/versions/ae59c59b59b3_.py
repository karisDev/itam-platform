"""empty message

Revision ID: ae59c59b59b3
Revises: 46a4a0cdf279
Create Date: 2023-09-09 14:45:12.158264

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ae59c59b59b3'
down_revision: Union[str, None] = '46a4a0cdf279'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('profiles', 'team_id')
    op.add_column('users', sa.Column('team_id', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'team_id')
    op.add_column('profiles', sa.Column('team_id', sa.INTEGER(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###