from fastapi import APIRouter

from backend.api import admins, auth, users, teams, events, participation

router = APIRouter(prefix="/api")

router.include_router(admins.router)
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(teams.router)
router.include_router(events.router)
router.include_router(participation.router)


@router.get("/")
def root():
    return {"message": "Hello from api!"}

