import csv
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Hàm lấy dữ liệu và đẩy lên API
def scrape_data():
    # Khởi tạo Chrome driver
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    driver = webdriver.Chrome(options=options)

    # Truy cập vào trang TikTok Ads Creative Center
    url = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/vi"
    driver.get(url)

    # Đợi trang tải đầy đủ
    time.sleep(5)

    # Chọn quốc gia "Việt Nam" trong menu chọn vị trí
    try:
        vietnam_location = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//span[contains(text(), 'Việt Nam')]"))
        )
        vietnam_location.click()  # Nhấp vào để chọn Việt Nam
        time.sleep(2)  # Chờ để trang cập nhật sau khi chọn quốc gia
    except Exception as e:
        print("Không thể chọn vị trí 'Việt Nam':", e)

    data = []
    collected_hashtags = set()  # Tập hợp để lưu các hashtag đã thu thập

    try:
        while len(data) < 20:  # Chạy vòng lặp cho đến khi có ít nhất 20 giá trị
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

            # Thêm các hashtag và rank mới vào data nếu chúng chưa được thu thập
            for i in range(min(len(rank_texts), len(hashtag_texts))):
                hashtag = hashtag_texts[i]
                if hashtag not in collected_hashtags:
                    data.append({"Rank": rank_texts[i], "Hashtag": hashtag})
                    collected_hashtags.add(hashtag)  # Đánh dấu hashtag này là đã thu thập
                if len(data) >= 20:
                    break  # Thoát khỏi vòng lặp khi đã có đủ 20 giá trị

        # Đẩy dữ liệu lên API
        response = requests.post("http://localhost:5000/api/upload-data", json=data)
        if response.status_code == 200:
            print("Dữ liệu đã được đẩy lên server thành công!")
        else:
            print("Lỗi khi đẩy dữ liệu:", response.status_code, response.text)
    
    except Exception as e:
        print("Lỗi khi lấy dữ liệu:", e)
    
    finally:
        driver.quit()

# Lặp lại quá trình lấy dữ liệu mỗi tiếng
while True:
    scrape_data()
    print("Đang đợi 1 tiếng để lấy dữ liệu lần tiếp theo...")
    time.sleep(3600)  # Đợi 1 tiếng (3600 giây)
