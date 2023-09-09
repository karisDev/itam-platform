from fastapi import FastAPI
import uvicorn
from starlette.middleware.cors import CORSMiddleware
import asyncio
import schedule

from backend.api.index import router
from backend.core.database import get_db
from backend.models.events import EventDB
from backend.parsing import collect_data, parse_data
from backend.settings import settings

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.get("/")
def root():
    return {"message": "Hello from root!"}


@app.on_event("startup")
async def startup_event():
    parse_data()
    start_background_task()
    asyncio.create_task(background_task())


def start_background_task():
    schedule.every(1).hour.do(parse_data)  # Запускать каждый час


async def background_task():
    while True:
        schedule.run_pending()
        await asyncio.sleep(1)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.server_host,
        port=settings.server_port,
        reload=True
    )
