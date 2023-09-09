from datetime import timedelta

from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from backend.schemas.users import UserRegister, User, UserLogin
from backend.services.auth import AuthService, get_auth_service
from backend.services.users import UserService, get_user_service
from backend.core.security import create_access_token
from backend.settings import settings
from backend.schemas.tokens import Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=Token)
def register(register_request: UserRegister, user_service: UserService = Depends(get_user_service)):
    user = user_service.create_user(register_request)
    dict_user = jsonable_encoder(user, exclude={"id", "hashed_password"})
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data=dict_user, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        auth_service: AuthService = Depends(get_auth_service)
):
    user = auth_service.authenticate_user(UserLogin(email=form_data.username, password=form_data.password))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    dict_user = jsonable_encoder(user, exclude={"id", "hashed_password"})
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data=dict_user, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

