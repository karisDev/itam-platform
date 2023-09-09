from sqlalchemy import Column, Integer, String

from .base import Base


class EventDB(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    date_event = Column(String)
    date_registration = Column(String)
    prize = Column(String)
    target = Column(String)
    image_url = Column(String)

    def __init__(self, data):
        self.title = data.get('title')
        self.date_event = data.get('Даты хакатона')
        self.date_registration = data.get('Дата конца регистрации')
        self.prize = data.get('Призовой фонд')
        self.target = data.get('Целевая аудитория')
        self.image_url = data.get('image_url')