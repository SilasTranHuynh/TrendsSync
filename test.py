import time
import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# Hàm lấy dữ liệu và lưu vào CSV
def fetch_youtube_trends():
    # Khởi tạo Chrome driver với chế độ headless
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Chạy không hiển thị giao diện trình duyệt
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--no-sandbox')
    
    driver = webdriver.Chrome(options=chrome_options)

    # Mở trang YouTube Trending
    driver.get("https://www.youtube.com/feed/trending?bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D")
    time.sleep(5)  # Chờ trang tải xong

    # Lấy tất cả các thẻ img chứa thumbnail của video
    video_thumbnails = driver.find_elements(By.CSS_SELECTOR, 'img.yt-core-image--loaded')

    # Lấy URL thumbnail
    thumbnails_data = []
    for i, thumbnail in enumerate(video_thumbnails):
        img_url = thumbnail.get_attribute('src')  # Lấy URL của thumbnail
        
        # Thêm vào danh sách dữ liệu
        thumbnails_data.append({
            'Rank': i + 1,
            'Thumbnail_URL': img_url
        })

    # Lưu dữ liệu vào file CSV
    with open('youtube_trends.csv', mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=["Rank", "Thumbnail_URL"])
        writer.writeheader()
        writer.writerows(thumbnails_data)
        print("Dữ liệu đã được lưu vào youtube_trends.csv!")

    driver.quit()

# Gọi hàm để thu thập dữ liệu
fetch_youtube_trends()
