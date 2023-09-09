import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    email: EmailStr
    nickname: str
    fullname: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    id: int
    email: EmailStr
    nickname: str
    fullname: str
    role: str
    team_id: Optional[int]

    class Config:
        from_attributes = True
