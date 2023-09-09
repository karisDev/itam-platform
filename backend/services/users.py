from fastapi import HTTPException, Depends
from passlib.context import CryptContext

from backend.models import UserDB
from backend.repositories.user.postgresql import UserRepository, get_user_repository
from backend.schemas.users import UserRegister
from backend.core.security import get_password_hash

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserService:
    def __init__(self, db: UserRepository) -> None:
        self.db = db

    def delete(self, user_id: int) -> None:
        self.db.delete(user_id)

    def update(self, user_id: int, user_data: UserRegister) -> UserDB:

        user = self.db.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=400, detail="Пользователь не существует")

        for key, value in user_data:
            if key == "password":
                setattr(user, "hashed_password", get_password_hash(value))
            else:
                setattr(user, key, value)
        self.db.update(user)

        return user

    def create_user(self, user_data: UserRegister) -> UserDB:
        curr_user = self.db.get_user_by_email(user_data.email)
        if curr_user:
            raise HTTPException(status_code=400, detail="Пользователь с такой почтой уже существует")

        user = self.db.create(user_data)
        
        return user

    def get_users(self) -> list[UserDB]:
        users = self.db.get_users()
        return users

    def get_user_by_id(self, user_id: int) -> UserDB:
        user = self.db.get_user_by_id(user_id)
        return user

    def get_user_by_email(self, email: str) -> UserDB:
        user = self.db.get_user_by_email(email)
        return user


def get_user_service(user_repository: UserRepository = Depends(get_user_repository)) -> UserService:
    user_service = UserService(user_repository)
    return user_service
