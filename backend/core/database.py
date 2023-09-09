from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from backend.settings import settings


def get_url():
    user = settings.postgres_user
    password = settings.postgres_password
    host = settings.postgres_host
    db = settings.postgres_db
    return f"postgresql://{user}:{password}@{host}/{db}"


# metadata = MetaData()
engine = create_engine(get_url())
# metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
