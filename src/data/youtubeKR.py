from googleapiclient.discovery import build
import pandas as pd


api_key = 'AIzaSyB5xkShZYYRUE4PjfTo1D_O42YRjeJgMis'
youtube = build('youtube', 'v3', developerKey=api_key)


request = youtube.videos().list(
    part='snippet,statistics', 
    chart='mostPopular',       
    regionCode='KR',       # VN, KR, US      
    maxResults=10,             
    videoCategoryId='10'       # 10: am nhac, 20: game, 30: Phim anh 
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