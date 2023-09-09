from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean

from .base import Base


class ProfileDB(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    position = Column(String)
    competence = Column(String)
    work_experience = Column(String)
    description = Column(Text)
    ready_to_move = Column(Boolean)
    user_id = Column(Integer)
    command_pitch = Column(Integer, default=0)
    command_tasks = Column(Integer, default=0)
    command_interest = Column(Integer, default=0)
    rating = Column(Integer, default=0)
    participation_count = Column(Integer, default=0)

    def __init__(self, user_id, profile_data):
        self.user_id = user_id
        self.position = profile_data.position
        self.competence = profile_data.competence
        self.work_experience = profile_data.work_experience
        self.description = profile_data.description
        self.ready_to_move = profile_data.ready_to_move
        self.command_pitch = profile_data.command_pitch
        self.command_tasks = profile_data.command_tasks
        self.command_interest = profile_data.command_interest
        self.rating = profile_data.rating
        self.participation_count = profile_data.participation_count
