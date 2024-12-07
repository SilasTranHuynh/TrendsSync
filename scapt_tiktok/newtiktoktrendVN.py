import csv
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains  # Để kết hợp ActionChains

# Hàm lấy dữ liệu và lưu vào CSV
def scrape_data():
    # Khởi tạo Chrome driver mà không có chế độ headless
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    options.add_argument('--start-maximized')  # Mở cửa sổ ở chế độ toàn màn hình
    driver = webdriver.Chrome(options=options)

    # Truy cập vào trang TikTok Ads Creative Center
    url = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/vi"
    driver.get(url)

    # Đợi trang tải đầy đủ
    time.sleep(5)

    data = []
    collected_hashtags = set()  # Tập hợp để lưu các hashtag đã thu thập

    try:
        while len(data) < 20:  # Chạy vòng lặp cho đến khi có ít nhất 20 giá trị
            # Tìm và nhấn vào nút "Xem thêm" nếu nó hiển thị
            try:
                load_more_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CLASS_NAME, "ViewMoreBtn_viewMoreBtn__fOkv2"))
                )
                # Sử dụng ActionChains để nhấp vào nút "Xem thêm"
                actions = ActionChains(driver)
                actions.move_to_element(load_more_button).click().perform()  # Di chuyển đến phần tử và nhấp
                time.sleep(2)  # Chờ một chút để dữ liệu mới tải xong
            except Exception as e:
                print("Không tìm thấy nút 'Xem thêm' hoặc không thể nhấn thêm nữa:", e)
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

            # Lấy thông tin về "Views" (lượt xem)
            views = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "CardPc_itemValue__XGDmG"))
            )
            view_texts = [view.text for view in views]

            # Thêm các hashtag, rank và views mới vào data nếu chúng chưa được thu thập
            for i in range(min(len(rank_texts), len(hashtag_texts), len(view_texts))):
                hashtag = hashtag_texts[i]
                view = view_texts[i]
                if hashtag not in collected_hashtags:
                    data.append({"Rank": rank_texts[i], "Hashtag": hashtag, "Views": view})
                    collected_hashtags.add(hashtag)  # Đánh dấu hashtag này là đã thu thập
                if len(data) >= 20:
                    break  # Thoát khỏi vòng lặp khi đã có đủ 20 giá trị

        # Lưu dữ liệu vào file CSV
        with open('tiktok_trends.csv', mode='w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=["Rank", "Hashtag", "Views"])
            writer.writeheader()
            writer.writerows(data)
            print("Dữ liệu đã được lưu vào tiktok_trends.csv!")

    except Exception as e:
        print("Lỗi khi lấy dữ liệu:", e)
    
    finally:
        driver.quit()

# Lặp lại quá trình lấy dữ liệu mỗi tiếng
while True:
    scrape_data()
    print("Đang đợi 1 tiếng để lấy dữ liệu lần tiếp theo...")
    time.sleep(3600)  # Đợi 1 tiếng (3600 giây)
