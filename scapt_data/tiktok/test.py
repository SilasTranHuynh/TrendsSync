import requests
from bs4 import BeautifulSoup
import csv

def scrape_tiktok_trends_and_save_csv():
    url = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/vi"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    try:
        # Gửi yêu cầu HTTP GET
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Kiểm tra lỗi HTTP

        # Phân tích HTML bằng BeautifulSoup
        soup = BeautifulSoup(response.text, "html.parser")

        # Tìm các phần tử cần thiết
        rank = soup.select(".RankingStatus_rankingIndex__ZMDrH")
        hashtags = soup.select(".CardPc_titleText__RYOWo")
        views = soup.select(".CardPc_itemValue__XGDmG")

        data = []
        for hashtag, view, rank in zip(hashtags, views, rank):
            data.append({
                "Hashtag": hashtag.text.strip(),
                "Views": view.text.strip(),
                "Rank": rank.text.strip(),
            })

        # Ghi dữ liệu vào file CSV
        with open("tiktok_trends.csv", mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=["Hashtag", "Views", "Rank"])
            writer.writeheader()
            writer.writerows(data)

        print("Dữ liệu đã được lưu vào tệp 'tiktok_trends.csv'")

    except requests.exceptions.RequestException as e:
        print("Lỗi khi gửi yêu cầu:", e)

scrape_tiktok_trends_and_save_csv()
