from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.models import EventDB, ParticipationDB
from backend.models.teams import TeamDB
from backend.schemas.participation import ParticipationRegister, Participation, ParticipationFinish

router = APIRouter(prefix="/participation", tags=["participation"])


@router.post("/")
def declare_participation(participation: ParticipationRegister,
                          db: Session = Depends(get_db)):
    team = db.query(TeamDB).filter_by(id=participation.team_id).first()
    if not team:
        raise HTTPException(status_code=400, detail="Команды не существует")
    event = db.query(EventDB).filter_by(id=participation.event_id).first()
    if not event:
        raise HTTPException(status_code=400, detail="События не существует")
    participation = ParticipationDB(ParticipationRegister)
    db.add(participation)
    db.commit()


@router.get("/", response_model=list[Participation])
def get_all_participation(team_id: int, db: Session = Depends(get_db)):
    participation = db.query(ParticipationDB).filter_by(team_id=team_id).all()
    return participation


@router.get("/{participation_id}", response_model=Participation)
def get_one_participation(participation_id: int, db: Session = Depends(get_db)):
    participation = db.query(ParticipationDB).filter_by(id=participation_id).all()
    return participation


@router.put("/{participation_id}")
def finish_participation(finished: ParticipationFinish, db: Session = Depends(get_db)):
    participation = db.query(ParticipationDB).filter_by(id=finished.participation_id).first()
    if not participation:
        raise HTTPException(status_code=400, detail="Такой заявки не существует")
    participation.status = "На проверке модератором"
    participation.repo_url = finished.repo_url
    participation.description = finished.description
    participation.place = finished.place
    db.add(participation)
    db.commit()
