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
        print('starting parser')
        url = f'https://api.telegram.org/bot{self.token}/getUpdates'
        response = requests.get(url)
        messages = response.json()["result"]
#         messages = [{"update_id":730674868,
# "message":{"message_id":1,"from":{"id":705821850,"is_bot":False,"first_name":"Andrew","username":"using_namespace","language_code":"ru"},"chat":{"id":705821850,"first_name":"Andrew","username":"using_namespace","type":"private"},"date":1694348364,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}},{"update_id":730674869,
# "message":{"message_id":3,"from":{"id":705821850,"is_bot":False,"first_name":"Andrew","username":"using_namespace","language_code":"ru"},"chat":{"id":705821850,"first_name":"Andrew","username":"using_namespace","type":"private"},"date":1694349111,"text":"ssdf"}},{"update_id":730674870,
# "message":{"message_id":5,"from":{"id":705821850,"is_bot":False,"first_name":"Andrew","username":"using_namespace","language_code":"ru"},"chat":{"id":705821850,"first_name":"Andrew","username":"using_namespace","type":"private"},"date":1694353746,"text":"\u043e\u0430\u0435\u043e"}}]
        user_to_id = {}
        for message in messages:
            user_to_id[message["message"]["from"]["username"]] = message["message"]["from"]["id"]
        db = SessionLocal()
        for (user, chat_id) in user_to_id.items():
            curr_user = db.query(TelegramDB).filter_by(username=user).first()
            if not curr_user:
                db.add(TelegramDB(username=user, chat_id=chat_id))
        db.commit()
        db.close()


bot = Bot()
