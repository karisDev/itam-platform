import re
from bs4 import BeautifulSoup
from selenium import webdriver

options = webdriver.ChromeOptions()
options.add_argument("--headless")

driver = webdriver.Chrome(options=options)

try:
    driver.get(url="https://www.хакатоны.рф/")
    source_page = driver.page_source
    driver.close()
    driver.quit()
except:
    print("Ooops...")

soup = BeautifulSoup(source_page, "lxml")
hackatons = soup.find_all("div", class_=re.compile("textwrapper"))

all_hackathons = []  # Список для хранения данных по каждому хакатону

for hackathon in hackatons:
    hackathon_data = {}  # Словарь для хранения данных по текущему хакатону
    title = hackathon.find(class_=re.compile("title")).text.strip()
    hackathon_data["title"] = title

    contents = hackathon.find(class_=re.compile("descr")).contents

    res, tmp = [], ''
    for content in contents:
        if isinstance(content, str):
            if not bool(tmp):
                res.append(content.strip())
            else:
                tmp += content
                res.append(tmp.strip())
                tmp = ''
        else:
            tmp = content.text

    hackathon_data["details"] = res
    all_hackathons.append(hackathon_data)

# Теперь у вас есть список словарей all_hackathons, где каждый словарь содержит информацию о хакатоне.
print(1)
def extract_hackathon_data(hackathon_list):
    extracted_data = []

    for hackathon in hackathon_list:
        data = {}
        data["title"] = hackathon["title"]

        for detail in hackathon["details"]:
            if "Офлайн" in detail or "Онлайн" in detail:
                data["Формат и место проведения"] = detail
            elif "Хакатон:" in detail:
                data["Даты хакатона"] = detail.replace("Хакатон:", "").strip()
            elif "Регистрация:" in detail:
                data["Дата конца регистрации"] = detail.replace("Регистрация:", "").strip()
            elif "Организаторы:" in detail:
                data["Организатор"] = detail.replace("Организаторы:", "").strip()
            elif "Технологический фокус:" in detail:
                data["Технологический фокус"] = detail.replace("Технологический фокус:", "").strip()
            elif "Призовой фонд:" in detail:
                data["Призовой фонд"] = detail.replace("Призовой фонд:", "").strip()
            elif "Целевая аудитория:" in detail:
                data["Целевая аудитория"] = detail.replace("Целевая аудитория:", "").strip()

        extracted_data.append(data)

    return extracted_data

result = extract_hackathon_data(all_hackathons)

result[10:15] # test