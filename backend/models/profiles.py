from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, JSON
from sqlalchemy.orm import relationship

# from .profile_competence import profile_competence
from .base import Base
# from .profile_position import profile_positions


class ProfileDB(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    # positions = relationship("Position", secondary=profile_positions, back_populates="profiles")
    # competence = relationship("Competence", secondary=profile_competence, back_populates="competence")
    positions = Column(JSON)
    competences = Column(JSON)
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
        self.positions = profile_data.positions
        self.competences = profile_data.competences
        self.description = profile_data.description
        self.ready_to_move = profile_data.ready_to_move
        self.command_pitch = profile_data.command_pitch
        self.command_tasks = profile_data.command_tasks
        self.command_interest = profile_data.command_interest
        self.rating = profile_data.rating
        self.participation_count = profile_data.participation_count
