from googleapiclient.discovery import build
import pandas as pd
import time
from IPython.display import clear_output

# API key và khởi tạo dịch vụ YouTube
api_key = 'AIzaSyB5xkShZYYRUE4PjfTo1D_O42YRjeJgMis'
youtube = build('youtube', 'v3', developerKey=api_key)

def fetch_youtube_data():
    """
    Hàm để lấy dữ liệu từ YouTube Data API
    """
    request = youtube.videos().list(
        part='snippet,statistics',
        chart='mostPopular',
        regionCode='VN',
        maxResults=15,
        videoCategoryId='10'  # ID của danh mục âm nhạc
    )
    response = request.execute()

    # Tạo danh sách dữ liệu
    data = []
    for video in response['items']:
        title = video['snippet']['title']
        channel_title = video['snippet']['channelTitle']
        view_count = video['statistics']['viewCount']
        video_id = video['id']
        video_url = f'https://www.youtube.com/watch?v={video_id}'

        data.append({
            'Title': title,
            'Channel': channel_title,
            'Views': view_count,
            'URL': video_url
        })
    return data

def save_to_csv(data, filename='youtube_trends_realtime.csv'):
    """
    Hàm lưu dữ liệu vào file CSV
    """
    df = pd.DataFrame(data)  # Chuyển dữ liệu thành DataFrame
    df.to_csv(filename, index=False, encoding='utf-8')  # Lưu vào file CSV
    print(f"Dữ liệu đã được lưu vào tệp: {filename}")

def display_realtime_data():
    """
    Hàm hiển thị dữ liệu dạng realtime và lưu vào CSV
    """
    while True:
        # Gọi hàm để lấy dữ liệu
        data = fetch_youtube_data()
        
        # Xóa màn hình để hiển thị dữ liệu mới
        clear_output(wait=True)
        
        # Hiển thị dữ liệu
        df = pd.DataFrame(data)
        print(df)
        
        # Lưu dữ liệu vào file CSV
        save_to_csv(data)

        # Thời gian chờ trước khi cập nhật tiếp (ví dụ: 60 giây)
        time.sleep(60)

# Gọi hàm hiển thị realtime
display_realtime_data()


api_key = 'AIzaSyB5xkShZYYRUE4PjfTo1D_O42YRjeJgMis'
youtube = build('youtube', 'v3', developerKey=api_key)


request = youtube.videos().list(
    part='snippet,statistics', 
    chart='mostPopular',       
    regionCode='VN',            
    maxResults=10,             
    videoCategoryId='10'        # ID của danh mục âm nhạc
)
response = request.execute()


data = []

# Lấy thông tin từ response và thêm vào danh sách
for video in response['items']:
    title = video['snippet']['title']
    channel_title = video['snippet']['channelTitle']
    view_count = video['statistics']['viewCount']
    video_id = video['id']
    video_url = f'https://www.youtube.com/watch?v={video_id}'

    # Thêm thông tin video vào danh sách
    data.append({
        'Title': title,
        'Channel': channel_title,
        'Views': view_count,
        'URL': video_url
    })

# Tạo DataFrame từ danh sách dữ liệu
df = pd.DataFrame(data)

# Lưu DataFrame vào file CSV
df.to_csv('youtube_trends.csv', index=False, encoding='utf-8')

print("Dữ liệu đã được lưu vào file youtube_trends.csv")
