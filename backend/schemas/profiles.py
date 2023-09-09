from pydantic import BaseModel


class Profile(BaseModel):
    position: str
    competence: str
    work_experience: str
    description: str
    ready_to_move: bool
