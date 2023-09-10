from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.bot import bot
from backend.core.database import get_db
from backend.core.security import oauth2_scheme
from backend.models import UserDB, InvitationDB, TelegramDB
from backend.models.teams import TeamDB
from backend.schemas.invitations import Invitation
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


@router.post("/invite")
def invite_to_team(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db),
                   auth_service: AuthService = Depends(get_auth_service)):
    to_user = db.query(UserDB).filter_by(id=user_id).first()
    if not to_user:
        raise HTTPException(status_code=400, detail="Юзера не существует")
    from_user = auth_service.get_current_user(token)
    invitation = InvitationDB(from_id=from_user.id, to_id=to_user.id, team_id=from_user.id)
    tg_user = db.query(TelegramDB).filter_by(username=to_user.nickname).first()
    print("teams", tg_user)
    if tg_user:
        bot.send_message(tg_user.chat_id, "У вас новое приглашение в команду")
    db.add(invitation)
    db.commit()


@router.get("/invite", response_model=list[Invitation])
def get_invitations(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db),
                    auth_service: AuthService = Depends(get_auth_service)):
    user = auth_service.get_current_user(token)
    if not user:
        raise HTTPException(status_code=400, detail="Юзера не существует")
    db_invitations = db.query(InvitationDB).filter_by(to_id=user.id)
    invitations = []
    for invitation in db_invitations:
        from_user = db.query(UserDB).filter_by(id=invitation.from_id).first()
        team = db.query(TeamDB).filter_by(id=invitation.team_id).first()
        invitations.append(Invitation(id=invitation.id, team_name=team.name,
                                      user=from_user, status=invitation.status,
                                      date=invitation.date))
    return invitations


@router.put("/invite")
def respond_to_invite(invitation_id: int, status: bool, db: Session = Depends(get_db)):
    invitation = db.query(InvitationDB).filter_by(id=invitation_id).first()
    if not invitation:
        raise HTTPException(status_code=400, detail="Заявки не существует")
    invitation.status = status
    if status:
        user = db.query(UserDB).filter_by(id=invitation.to_id).first()
        user.team_id = invitation.team_id
        db.add(user)
    db.add(invitation)
    db.commit()


@router.get("/{team_id}", response_model=Team)
def get_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(TeamDB).filter_by(id=team_id).first()
    if not team:
        raise HTTPException(status_code=400, detail="Команды не существует")
    users = db.query(UserDB).filter_by(team_id=team.id).all()
    team = Team(name=team.name, users=users)
    return team
