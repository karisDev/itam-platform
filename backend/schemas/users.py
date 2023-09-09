import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class Commends(BaseModel):
    pitch: int = 0
    tasks: int = 0
    interest: int = 0


class UserRegister(BaseModel):
    email: EmailStr
    nickname: str
    fullname: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    email: EmailStr
    nickname: str
    fullname: str
    role: str
    command_pitch: int
    command_tasks: int
    command_interest: int
    teamId: Optional[int]
    rating: int
    participation_count: int

    class Config:
        from_attributes = True
