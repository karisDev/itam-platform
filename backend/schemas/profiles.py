from typing import Optional

from pydantic import BaseModel


class Profile(BaseModel):
    positions: list
    competences: list
    work_experience: str
    description: str
    ready_to_move: bool
    command_pitch: int
    command_tasks: int
    command_interest: int
    rating: int
    participation_count: int

    class Config:
        from_attributes = True
