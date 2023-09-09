from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from .base import Base


class Commends:
    def __init__(self, pitch=0, tasks=0, interest=0):
        self.pitch = pitch
        self.tasks = tasks
        self.interest = interest


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    nickname = Column(String)
    fullname = Column(String)
    role = Column(String, default='user')
    hashed_password = Column(String)
    command_pitch = Column(Integer, default=0)
    command_tasks = Column(Integer, default=0)
    command_interest = Column(Integer, default=0)
    team_id = Column(Integer, default=None)
    rating = Column(Integer, default=0)
    participation_count = Column(Integer, default=0)
