from typing import Optional

from pydantic import BaseModel


class Profile(BaseModel):
    position: str
    competence: str
    work_experience: str
    description: str
    ready_to_move: bool
    command_pitch: int
    command_tasks: int
    command_interest: int
    teamId: Optional[int]
    rating: int
    participation_count: int
