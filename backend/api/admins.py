from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.background import BackgroundTasks

from backend.bot import bot
from backend.core.database import get_db
from backend.dependencies.role_checker import RoleChecker
from backend.models import ParticipationDB, UserDB, TelegramDB, ProfileDB
from backend.schemas.participation import Participation

allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(prefix="/admin", tags=["admin"])
# router.dependencies = Depends(allow_create_resource)


@router.get("/is_admin", response_model=bool)
def is_admin():
    return True


@router.get("/participation", response_model=list[Participation])
def get_participation_for_check(db: Session = Depends(get_db)):
    participation = db.query(ParticipationDB).all()
    return participation


@router.post("/finish_participation")
async def finish_participation(participation_id: int, points: int, db: Session = Depends(get_db)):
    participation = db.query(ParticipationDB).filter_by(id=participation_id).first()
    participation.added_to_rating = points
    participation.status = "Участие завершено"
    db.add(participation)
    users = db.query(UserDB).filter_by(team_id=participation.team_id).all()
    for user in users:
        profile = db.query(ProfileDB).filter_by(user_id=user.id).first()
        profile.rating += points
        db.add(profile)
        db.commit()
        tg_user = db.query(TelegramDB).filter_by(username=user.nickname).first()
        print("admin", tg_user)
        if tg_user:
            bot.send_message(tg_user.chat_id, "Модератор принял вашу заявку")


@router.post("/decline_participation")
def decline_participation(participation_id: int, db: Session = Depends(get_db)):
    participation = db.query(ParticipationDB).filter_by(id=participation_id).first()
    participation.status = "В процессе участия"
    db.add(participation)
    db.commit()
    users = db.query(UserDB).filter_by(team_id=participation.team_id).all()
    for user in users:
        tg_user = db.query(TelegramDB).filter_by(username=user.nickname).first()
        print("admin", tg_user)
        if tg_user:
            bot.send_message(tg_user.chat_id, "Модератор отклонил вашу заявку")