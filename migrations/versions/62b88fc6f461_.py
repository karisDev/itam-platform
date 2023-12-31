"""empty message

Revision ID: 62b88fc6f461
Revises: a9d7fda35beb
Create Date: 2023-09-11 00:19:13.522910

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '62b88fc6f461'
down_revision: Union[str, None] = 'a9d7fda35beb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('participations', sa.Column('rates_from_ids', sa.JSON(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('participations', 'rates_from_ids')
    # ### end Alembic commands ###
