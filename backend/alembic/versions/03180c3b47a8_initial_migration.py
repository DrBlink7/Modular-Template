"""Initial Migration

Revision ID: 03180c3b47a8
Revises: 
Create Date: 2024-12-11 14:21:21.427523

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '03180c3b47a8'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.Index('ix_users_id', 'id')
    )


def downgrade() -> None:
    op.drop_table('users')