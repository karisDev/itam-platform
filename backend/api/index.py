from fastapi import APIRouter

from backend.api import admins, auth, users, teams, events

router = APIRouter(prefix="/api")

router.include_router(admins.router)
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(teams.router)
router.include_router(events.router)


@router.get("/")
def root():
    return {"message": "Hello from api!"}

