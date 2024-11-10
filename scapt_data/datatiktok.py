import csv
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re

# Hàm chuyển đổi lượt view từ ký hiệu (K, M) sang số thực để dễ sắp xếp
def convert_views(view_str):
    if 'M' in view_str:
        return float(view_str.replace('M', '')) * 1_000_000
    elif 'K' in view_str:
        return float(view_str.replace('K', '')) * 1_000
    else:
        return float(view_str.replace(',', ''))

# Hàm lấy dữ liệu và lưu vào CSV
def scrape_data_subtitle():
    # Khởi tạo Chrome driver
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    driver = webdriver.Chrome(options=options)

    # Truy cập vào trang bạn muốn cào
    url = "https://www.tiktok.com/tag"  # Thay bằng URL chính xác của bạn
    driver.get(url)

    # Đợi trang tải đầy đủ
    time.sleep(5)

    data = []

    try:
        while len(data) < 20:  # Chạy vòng lặp cho đến khi có ít nhất 20 giá trị
            # Cuộn trang xuống để tải thêm nội dung
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)  # Chờ một chút để dữ liệu mới tải xong

            # Tìm và lấy nội dung từ các thẻ div có class cụ thể
            subtitles = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.XPATH, "//*[@class='css-10ibnu7-DivShareTitleContainer ekmpd5l3']"))
            )
            subtitle_texts = [subtitle.text for subtitle in subtitles]

            # Lưu nội dung vào danh sách `data`
            for subtitle_text in subtitle_texts:
                # Sử dụng regex để trích xuất hashtag và số lượng bài đăng
                match = re.search(r"(#[^\s]+)\s+([\d.,]+[MK]?)\s+posts", subtitle_text)
                if match:
                    hashtag = match.group(1)
                    views = match.group(2)
                    data.append({"Hashtag": hashtag, "Views": views})
                    if len(data) >= 20:
                        break  # Thoát khỏi vòng lặp khi đã có đủ 20 giá trị

            # Kiểm tra và thông báo số lượng dữ liệu đã lấy được
            print(f"Đã lấy được {len(data)} giá trị.")

        # Sắp xếp dữ liệu theo lượt view giảm dần
        data.sort(key=lambda x: convert_views(x["Views"]), reverse=True)

        # Lưu vào file CSV
        filename = "sorted_hashtag_data.csv"
        with open(filename, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=["Hashtag", "Views"])
            writer.writeheader()
            writer.writerows(data)
        
        print(f"Dữ liệu đã được lưu vào {filename}")
    
    except Exception as e:
        print("Lỗi khi lấy dữ liệu:", e)
    
    finally:
        driver.quit()

# Lặp lại quá trình lấy dữ liệu mỗi tiếng
while True:
    scrape_data_subtitle()
    print("Đang đợi 1 tiếng để lấy dữ liệu lần tiếp theo...")
    time.sleep(3600)  # Đợi 1 tiếng (3600 giây)
