from backend.core.database import SessionLocal
from backend.models import UserDB
from backend.models.telegram import TelegramDB
from backend.settings import settings
import requests


class Bot:
    token = settings.bot_token

    def send_message(self, chat_id, text):
        url = f'https://api.telegram.org/bot{self.token}/sendMessage?chat_id=@{chat_id}&text={text}'
        response = requests.get(url)

    def get_users(self):
        url = f'https://api.telegram.org/bot{self.token}/getUpdates'
        response = requests.get(url)
        messages = response.json()["result"]
        user_to_id = {}
        print(messages)
        for message in messages:
            user_to_id[message["message"]["from"]["username"]] = message["message"]["from"]["id"]
        db = SessionLocal()
        for user in user_to_id:
            curr_user = db.query(UserDB).filter_by(nickname=user[0]).first()
            if not curr_user:
                db.add(TelegramDB(username=user[0], chat_id=user[1]))
        db.commit()
        db.close()


bot = Bot()
