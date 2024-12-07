
from pytrends.request import TrendReq
import pandas as pd

pytrends = TrendReq(hl='en-VN', tz=360)

def get_trending_searches():
    try:
        trending_searches_df = pytrends.trending_searches(pn="vietnam")  
        return trending_searches_df
    except Exception as e:
        print("False:", e)
        return None

trending_searches = get_trending_searches()

if trending_searches is not None:
    trending_searches.to_csv("trending_search.csv", index=False)
    print("Dữ liệu đã được lưu vào trending_search.csv")
    print(trending_searches)
else:
    print("Không thể lấy dữ liệu thịnh hành.")