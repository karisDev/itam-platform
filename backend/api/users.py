from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException

from backend.core.security import oauth2_scheme
from backend.schemas.profiles import Profile
from backend.schemas.users import UserRegister, User
from backend.services.auth import AuthService, get_auth_service
from backend.services.users import get_user_service, UserService


router = APIRouter(prefix="/users", tags=["user"])


# @router.get("/", response_model=list[User])
# def index(user_service: UserService = Depends(get_user_service)):
#     all_users = user_service.get_users()
#     return all_users


@router.get("/me", response_model=User)
def get_me(token: Annotated[str, Depends(oauth2_scheme)], auth_service: AuthService = Depends(get_auth_service)):
    user = auth_service.get_current_user(token)
    return user


@router.get("/profile/check")
def profile(user_id: int, user_service: UserService = Depends(get_user_service)):
    profile = user_service.get_profile(user_id)
    if not profile:
        return False
    return True


@router.post("/profile")
def profile(user_id: int, profile_data: Profile, user_service: UserService = Depends(get_user_service)):
    user_service.set_profile(user_id, profile_data)


@router.get("/profile/{user_id}", response_model=Profile)
def profile(user_id: int, user_service: UserService = Depends(get_user_service)):
    profile = user_service.get_profile(user_id)
    if not profile:
        raise HTTPException(status_code=400, detail="Профиль не создан")
    return profile

# @router.get("/{user_id}", response_model=User)
# def get_user(user_id: int, user_service: UserService = Depends(get_user_service)):
#     user = user_service.get_user_by_id(user_id)
#     if not user:
#         raise HTTPException(status_code=400, detail="Пользователя не существует")
#     return user
#
#
# @router.delete("/{user_id}", response_model=bool)
# def delete_user(user_id: int, user_service: UserService = Depends(get_user_service)):
#     user_service.delete(user_id)
#     return True
#
#
# @router.put("/{user_id}", response_model=User)
# def update_user(user_id: int, user_data: UserRegister, user_service: UserService = Depends(get_user_service)):
#     user = user_service.update(user_id, user_data)
#     return user
