from typing import Optional

from pydantic import BaseModel

from backend.schemas.events import Event


class ParticipationRegister(BaseModel):
    team_id: int
    event_id: int


class Participation(ParticipationRegister):
    id: int
    place: Optional[str]
    status: str
    repo_url: Optional[str]
    description: Optional[str]
    added_to_rating: Optional[int]


class ParticipationFinish(BaseModel):
    participation_id: int
    place: str
    repo_url: str
    description: str
