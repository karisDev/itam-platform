from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.models.events import EventDB
from backend.schemas.events import Event

router = APIRouter(prefix="/events", tags=["events"])


# @router.post("/")
# def create_event(token: Annotated[str, Depends(oauth2_scheme)], name: str, db: Session = Depends(get_db),
#         auth_service: AuthService = Depends(get_auth_service)):
#     team = db.query(TeamDB).filter_by(name=name).first()
#     if team:
#         raise HTTPException(status_code=400, detail="Команда с таким именем уже существует")
#     db_team = TeamDB(name=name)
#     db.add(db_team)
#     db.commit()
#     db_user = auth_service.get_current_user(token)
#     db_user.team_id = db_team.id
#     db.add(db_user)
#     db.commit()


@router.get("/{event_id}", response_model=Event)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(EventDB).filter_by(id=event_id).first()
    if not event:
        raise HTTPException(status_code=400, detail="События не существует")
    return event


@router.get("/", response_model=list[Event])
def get_events(db: Session = Depends(get_db)):
    skip, limit = 0, 100
    db_events = db.query(EventDB).offset(skip).limit(limit).all()
    return db_events


# @router.put("/")
# def enter_team(token: Annotated[str, Depends(oauth2_scheme)], name: str, db: Session = Depends(get_db),
#         auth_service: AuthService = Depends(get_auth_service)):
#     db_team = db.query(TeamDB).filter_by(name=name).first()
#     if not db_team:
#         raise HTTPException(status_code=400, detail="Команда с таким именем уже существует")
#     db_user = auth_service.get_current_user(token)
#     db_user.team_id = db_team.id
#     db.add(db_user)
#     db.commit()
