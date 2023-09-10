from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from .base import Base


class TelegramDB(Base):
    __tablename__ = "telegram"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    chat_id = Column(String)


