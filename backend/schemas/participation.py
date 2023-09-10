from typing import Optional

from pydantic import BaseModel

from backend.schemas.events import Event


class Participation(BaseModel):
    id: int
    team_id: int
    event_id: int
    place: Optional[str]
    status: str
    repo_url: Optional[str]
    description: Optional[str]
    added_to_rating: Optional[int]
    rates_from_ids = Optional[list]


class ParticipationFinish(BaseModel):
    participation_id: int
    place: str
    repo_url: str
    description: str
