from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.core.security import oauth2_scheme
from backend.models import UserDB
from backend.models.teams import TeamDB
from backend.schemas.teams import Team
from backend.services.auth import AuthService, get_auth_service

router = APIRouter(prefix="/teams", tags=["teams"])


@router.post("/")
def create_team(token: Annotated[str, Depends(oauth2_scheme)], name: str, db: Session = Depends(get_db),
                auth_service: AuthService = Depends(get_auth_service)):
    team = db.query(TeamDB).filter_by(name=name).first()
    if team:
        raise HTTPException(status_code=400, detail="Команда с таким именем уже существует")
    db_team = TeamDB(name=name)
    db.add(db_team)
    db.commit()
    db_user = auth_service.get_current_user(token)
    db_user.team_id = db_team.id
    db.add(db_user)
    db.commit()


@router.get("/{name}", response_model=Team)
def get_team(name: str, db: Session = Depends(get_db)):
    team = db.query(TeamDB).filter_by(name=name).first()
    if not team:
        raise HTTPException(status_code=400, detail="Команды не существует")
    users = db.query(UserDB).filter_by(team_id=team.id).all()
    team = Team(name=team.name, users=users)
    return team


@router.get("/", response_model=list[Team])
def get_teams(db: Session = Depends(get_db)):
    db_teams = db.query(TeamDB).all()
    teams = []
    for team in db_teams:
        users = db.query(UserDB).filter_by(team_id=team.id).all()
        teams.append(Team(name=team.name, users=users))
    return teams


@router.put("/")
def enter_team(token: Annotated[str, Depends(oauth2_scheme)], name: str, db: Session = Depends(get_db),
               auth_service: AuthService = Depends(get_auth_service)):
    db_team = db.query(TeamDB).filter_by(name=name).first()
    if not db_team:
        raise HTTPException(status_code=400, detail="Команда с таким именем уже существует")
    db_user = auth_service.get_current_user(token)
    db_user.team_id = db_team.id
    db.add(db_user)
    db.commit()
