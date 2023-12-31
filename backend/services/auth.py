from jose import jwt, JWTError
from starlette import status
from fastapi import HTTPException, Depends

from backend.models import UserDB
from backend.services.users import UserService, get_user_service
from backend.settings import settings
from backend.core.security import verify_password, oauth2_scheme
from backend.schemas.users import UserRegister, User, UserLogin


class AuthService:
    def __init__(self, user_service: UserService) -> None:
        self.user_service = user_service

    def authenticate_user(self, user: UserLogin) -> UserDB:
        db_user = self.user_service.get_user_by_email(user.email)
        if not db_user:
            raise HTTPException(status_code=400, detail="Пользователь с такой почтой не существует")
        if not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Неверная пара почта/пароль")
        return db_user

    def get_current_user(self, token: str) -> UserDB:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.hash_algorithm])
            email: str = payload.get("email")
            if email is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        user = self.user_service.get_user_by_email(email)
        if user is None:
            raise credentials_exception
        return user


def get_auth_service(user_service: UserService = Depends(get_user_service)) -> AuthService:
    auth_service = AuthService(user_service)
    return auth_service
