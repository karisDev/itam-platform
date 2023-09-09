from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from .base import Base


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    nickname = Column(String)
    fullname = Column(String)
    role = Column(String, default='user')
    hashed_password = Column(String)

