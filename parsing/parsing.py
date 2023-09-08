# import os
import re

from bs4 import BeautifulSoup
from selenium import webdriver

# os.environ["webdrive.chrome.drive"] = "chromedriver.exe"

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

for hackathon in hackatons:
    title = hackathon.find(class_=re.compile("title")).text.strip()
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

    with open("test.txt", "a", encoding="utf-8") as file:
        file.write(f"{title}\n")
        for sentence in res:
            file.write(f"{sentence}\n")
        file.write(100 * '=' + '\n')
