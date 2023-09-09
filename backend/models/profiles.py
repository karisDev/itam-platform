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

    def __init__(self, user_id, profile_data):
        self.position = profile_data.position
        self.competence = profile_data.competence
        self.work_experience = profile_data.work_experience
        self.description = profile_data.description
        self.ready_to_move = profile_data.ready_to_move
        self.user_id = user_id
