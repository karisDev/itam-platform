from typing import Optional

from pydantic import BaseModel


class Event(BaseModel):
    id: int
    title: Optional[str]
    date_event: Optional[str]
    date_registration: Optional[str]
    prize: Optional[str]
    target: Optional[str]
    image_url: Optional[str]
