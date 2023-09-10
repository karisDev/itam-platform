from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 8000

    postgres_user: str
    postgres_password: str
    postgres_host: str
    postgres_db: str

    # redis_host: str = '127.0.0.1'
    # redis_port: int = 6379
    # redis_password: str = ""

    jwt_secret_key: str
    hash_algorithm: str
    access_token_expire_minutes: int

    bot_token: str


settings = Settings(
    _env_file=f"{os.path.dirname(os.path.abspath(__file__))}/.env",
    _env_file_encoding='utf-8',
)
