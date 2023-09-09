from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.orm import relationship

from .base import Base


class PositionDB(Base):
    __tablename__ = "positions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True)
    profiles = relationship("ProfileDB", secondary="profile_positions")

