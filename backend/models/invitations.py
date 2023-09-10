from sqlalchemy import Column, Integer, String, DateTime, Date, Boolean
from sqlalchemy.sql import func

from .base import Base


class InvitationDB(Base):
    __tablename__ = "invitations"

    id = Column(Integer, primary_key=True, index=True)
    from_id = Column(Integer)
    to_id = Column(Integer)
    team_id = Column(Integer)
    date = Column(Date, default=func.current_date())
    status = Column(Boolean)

