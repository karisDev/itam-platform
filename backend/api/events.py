from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.models.events import EventDB
from backend.schemas.events import Event

router = APIRouter(prefix="/events", tags=["events"])


@router.get("/{event_id}", response_model=Event)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(EventDB).filter_by(id=event_id).first()
    if not event:
        raise HTTPException(status_code=400, detail="События не существует")
    return event


@router.get("/", response_model=list[Event])
def get_events(db: Session = Depends(get_db)):
    skip, limit = 0, 15
    db_events = db.query(EventDB).order_by(EventDB.id.desc()).offset(skip).limit(limit).all()
    return db_events

