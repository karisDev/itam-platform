from pydantic import BaseModel

from backend.schemas.users import User


class Team(BaseModel):
    id: int
    name: str
    rating: float
    users: list[User]
