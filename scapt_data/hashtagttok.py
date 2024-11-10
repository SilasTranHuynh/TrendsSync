from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import csv  # Import thư viện csv để lưu dữ liệu

# Đường dẫn tới ChromeDriver
driver_path = "D:\\TrendsSync\\chromedriver\\chromedriver-win64\\chromedriver.exe"  # Đảm bảo đây là đường dẫn chính xác đến file chromedriver.exe

# Khởi tạo Service và WebDriver
service = Service(driver_path)
driver = webdriver.Chrome(service=service)

# Truy cập vào trang Discover của TikTok
url = "https://www.tiktok.com/discover"
driver.get(url)

# Tạm dừng để trang tải nội dung
time.sleep(5)

# Cuộn xuống để tải thêm hashtag (nếu cần)
for _ in range(5):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)

# Lấy nội dung HTML của trang
soup = BeautifulSoup(driver.page_source, "html.parser")

# Tìm các hashtag
hashtags = soup.find_all("a", class_="css-gsh7eh-StyledLink e102r7is3")  # Tìm đúng tên lớp CSS của hashtag (bạn cần xem mã HTML)

#css-gsh7eh-StyledLink e102r7is3 hashtag 
#css-12o3egm-DivSubtitle e102r7is8 View
# Lưu lại dữ liệu các hashtag có dấu # ở đầu
hashtag_list = []
for tag in hashtags:
    name = tag.text
    link = tag["href"]
    if name.startswith("#"):  # Chỉ thêm những hashtag có dấu # ở đầu
        hashtag_list.append({"hashtag": name, "link": link})

# Đóng trình duyệt
driver.quit()

# Lưu dữ liệu vào file CSV
with open("hashtagsnew.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["hashtag", "link"])
    writer.writeheader()
    writer.writerows(hashtag_list)

print("Dữ liệu hashtag có dấu # đã được lưu vào hashtagsnew.csv.")
