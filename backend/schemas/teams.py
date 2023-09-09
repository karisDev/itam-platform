from pydantic import BaseModel

from backend.schemas.users import User


class Team(BaseModel):
    name: str
    users: list[User]
