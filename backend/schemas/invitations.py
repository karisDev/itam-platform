from datetime import date

from typing import Optional

from pydantic import BaseModel

from backend.schemas.users import User


class Invitation(BaseModel):
    id: int
    team_name: str
    user: User
    status: Optional[bool]
    date: date
