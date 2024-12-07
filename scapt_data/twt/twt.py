import requests
from bs4 import BeautifulSoup
import csv

url = "https://getdaytrends.com/"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Gửi yêu cầu HTTP GET
response = requests.get(url, headers=headers)

# Kiểm tra nếu phản hồi thành công
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")

    rankings = soup.find_all("th", class_="pos")  # Class chứa ranking
    hashtags = soup.find_all("a", class_="string")  # Class chứa hashtag
    views = soup.find_all("div", class_="desc")     # Class chứa số lượt tweet

    # Lưu lại dữ liệu ranking, hashtag và lượt tweet
    data = []
    for rank, tag, view in zip(rankings, hashtags, views):
        ranking_text = rank.text.strip()  
        hashtag_text = tag.text.strip() 
        view_text = view.text.strip()  
        data.append({
            "ranking": ranking_text,
            "hashtag": hashtag_text,
            "views": view_text
        })

    # Lưu dữ liệu vào file CSV
    with open("hashtags_data.csv", mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=["ranking", "hashtag", "views"])
        writer.writeheader()
        writer.writerows(data)

    print("Dữ liệu ranking, hashtag và số lượt tweet đã được lưu vào hashtags_data.csv.")

else:
    print(f"Không thể truy cập vào trang. Mã lỗi HTTP: {response.status_code}")
