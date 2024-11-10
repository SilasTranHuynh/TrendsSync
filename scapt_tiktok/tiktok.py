import csv
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Hàm lấy dữ liệu và gửi tới API
def scrape_data():
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    options.add_argument("--start-maximized")  # Chạy trình duyệt ở chế độ toàn màn hình

    driver = webdriver.Chrome(options=options)

    url = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/vi"
    driver.get(url)
    time.sleep(5)

    data = []
    collected_hashtags = set()  # Tập hợp để lưu các hashtag đã thu thập

    try:
        while len(data) < 20:  # Chạy vòng lặp cho đến khi có ít nhất 20 giá trị
            previous_count = len(collected_hashtags)  # Lưu số lượng hashtag trước khi nhấn "Xem thêm"

            # Tìm và nhấn vào nút "Xem thêm" nếu nó hiển thị
            try:
                load_more_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CLASS_NAME, "ViewMoreBtn_viewMoreBtn__fOkv2"))
                )
                load_more_button.click()
                time.sleep(2)  # Chờ một chút để dữ liệu mới tải xong
            except:
                print("Không tìm thấy nút 'Xem thêm' hoặc không thể nhấn thêm nữa.")
                break

            # Lấy danh sách các chỉ số xếp hạng
            ranks = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "RankingStatus_rankingIndex__ZMDrH"))
            )
            rank_texts = [rank.text for rank in ranks]

            # Lấy danh sách các hashtag
            hashtags = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "CardPc_titleText__RYOWo"))
            )
            hashtag_texts = [hashtag.text for hashtag in hashtags]

            # Lấy danh sách lượt view của mỗi hashtag
            views = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "CardPc_itemValue__XGDmG"))
            )
            view_texts = [view.text for view in views]

            # Chỉ thêm các hashtag mới xuất hiện
            for i in range(previous_count, len(hashtag_texts)):
                hashtag = hashtag_texts[i]
                if hashtag not in collected_hashtags:
                    data.append({
                        "Rank": rank_texts[i],
                        "Hashtag": hashtag,
                        "Views": view_texts[i]
                    })
                    collected_hashtags.add(hashtag)  # Đánh dấu hashtag này là đã thu thập
                if len(data) >= 20:
                    break  # Thoát khỏi vòng lặp khi đã có đủ 20 giá trị

        # Gửi dữ liệu lên API Node.js
        response = requests.post("http://localhost:5000/api/upload-data", json=data)
        if response.status_code == 200:
            print("Dữ liệu đã được gửi tới server.")
        else:
            print("Lỗi khi gửi dữ liệu:", response.status_code, response.text)
    
    except Exception as e:
        print("Lỗi khi lấy dữ liệu:", e)
    
    finally:
        driver.quit()

# Lặp lại quá trình lấy dữ liệu mỗi 30 giây
while True:
    scrape_data()
    print("Đang đợi 30s để lấy dữ liệu lần tiếp theo...")
    time.sleep(30)
