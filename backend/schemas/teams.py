from pydantic import BaseModel

from backend.schemas.users import User


class Team(BaseModel):
    id: int
    name: str
    users: list[User]
