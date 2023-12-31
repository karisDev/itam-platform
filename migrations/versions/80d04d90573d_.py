"""empty message

Revision ID: 80d04d90573d
Revises: 883ded573375
Create Date: 2023-09-09 13:14:20.605766

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '80d04d90573d'
down_revision: Union[str, None] = '883ded573375'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('position', sa.String(), nullable=True),
    sa.Column('competence', sa.String(), nullable=True),
    sa.Column('work_experience', sa.String(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('ready_to_move', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_profiles_id'), 'profiles', ['id'], unique=False)
    op.add_column('users', sa.Column('team_id', sa.Integer(), nullable=True))
    op.drop_column('users', 'teamId')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('teamId', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('users', 'team_id')
    op.drop_index(op.f('ix_profiles_id'), table_name='profiles')
    op.drop_table('profiles')
    # ### end Alembic commands ###
