import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

# Đường dẫn đến chromedriver của bạn
driver_path = "D:\\TrendsSync\\chromedriver\\chromedriver-win64\\chromedriver.exe"

# Khởi tạo dịch vụ với đường dẫn chromedriver
service = Service(driver_path)
driver = webdriver.Chrome(service=service)

# Mở trang Explore của Twitter
driver.get('https://x.com/explore')
time.sleep(5)

# Tìm và điền username
username_field = driver.find_element(By.NAME, 'text')
username_field.send_keys('simimimi0')

# Nhấn vào nút "Next" sau khi nhập username
next_button = driver.find_element(By.CLASS_NAME, 'css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-184id4b.r-13qz1uu.r-2yi16.r-1qi8awa.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l')
next_button.click()
time.sleep(3)

# Tìm và điền mật khẩu
password_field = driver.find_element(By.NAME, 'password')
password_field.send_keys('1448844245Uit@')

# Nhấn vào nút đăng nhập
login_button = driver.find_element(By.CLASS_NAME, 'css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-19yznuf.r-64el8z.r-1fkl15p.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l')
login_button.click()
time.sleep(5)

# Lấy dữ liệu từ class 'css-175oi2r r-16y2uox r-bnwqim'
hashtags = []
try:
    elements = driver.find_elements(By.CLASS_NAME, 'css-175oi2r.r-16y2uox.r-bnwqim')
    for element in elements[:20]:  # Lấy tối đa 20 hashtag
        hashtags.append(element.text)
        print(element.text)
except Exception as e:
    print(f"Lỗi khi lấy dữ liệu từ class: {e}")

# Đóng trình duyệt
driver.quit()

# Lưu các hashtag vào file CSV
csv_file_path = "hashtags.csv"
with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["Hashtag"])  # Tên cột
    for hashtag in hashtags:
        writer.writerow([hashtag])

print(f"Đã lưu {len(hashtags)} hashtag vào file {csv_file_path}")
