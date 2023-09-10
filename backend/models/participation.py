from sqlalchemy import Column, Integer, String, DateTime, Date, Boolean
from sqlalchemy.sql import func

from .base import Base


class ParticipationDB(Base):
    __tablename__ = "participations"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer)
    event_id = Column(Integer)
    place = Column(String)
    description = Column(String)
    repo_url = Column(String)
    status = Column(String, default="В процессе участия")
    added_to_rating = Column(Integer)

