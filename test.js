const express = require("express");
const cors = require("cors");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const axios = require("axios");
const { google } = require("googleapis");

const app = express();
app.use(cors());

// API key YouTube
const apiKey = 'AIzaSyB5xkShZYYRUE4PjfTo1D_O42YRjeJgMis';
const youtube = google.youtube({ version: "v3", auth: apiKey });

// Bộ nhớ tạm để lưu dữ liệu
let youtubeTrends = [];

// ==================== YouTube Trends ====================

// Hàm thu thập dữ liệu từ YouTube API
const fetchYouTubeAPI = async () => {
    try {
        const response = await youtube.videos.list({
            part: "snippet,statistics",
            chart: "mostPopular",
            regionCode: "VN",
            maxResults: 30,
            videoCategoryId: "10", // ID danh mục âm nhạc
        });

        const youtubeAPITrends = response.data.items.map(video => ({
            Title: video.snippet.title,
            Channel: video.snippet.channelTitle,
            Views: video.statistics.viewCount,
            URL: `https://www.youtube.com/watch?v=${video.id}`,
            ThumbnailURL: video.snippet.thumbnails.high.url, // Thêm thumbnail từ API
        }));

        return youtubeAPITrends;
    } catch (error) {
        console.error("Error fetching YouTube API trends:", error.message);
        return [];
    }
};

// Hàm thu thập dữ liệu thumbnail từ YouTube Trending page
const fetchYouTubeScraping = async () => {
    let driver;
    try {
        // Cấu hình WebDriver với Chrome
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless'); // Chạy không hiển thị giao diện trình duyệt
        chromeOptions.addArguments('--disable-dev-shm-usage');
        chromeOptions.addArguments('--no-sandbox');

        driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();

        // Mở trang YouTube Trending
        await driver.get("https://www.youtube.com/feed/trending?bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D");
        await driver.sleep(5000); // Chờ trang tải xong

        const videoThumbnails = await driver.findElements(By.css("img.yt-core-image--loaded"));
        const thumbnailsData = [];

        for (let i = 0; i < videoThumbnails.length; i++) {
            const imgUrl = await videoThumbnails[i].getAttribute("src");
            thumbnailsData.push({
                rank: i + 1,
                thumbnail: imgUrl,
            });
        }

        return thumbnailsData;
    } catch (error) {
        console.error("Error fetching YouTube scraping data:", error.message);
        return [];
    } finally {
        if (driver) {
            await driver.quit(); // Đóng trình duyệt sau khi hoàn thành
        }
    }
};

// Kết hợp dữ liệu từ API và scraping
const combineYouTubeData = async () => {
    const apiData = await fetchYouTubeAPI();  // Lấy dữ liệu từ API
    const scrapingData = await fetchYouTubeScraping();  // Lấy dữ liệu từ scraping

    // Kết hợp dữ liệu từ API và scraping
    const combinedData = apiData.map((video, index) => ({
        ...video,
        rank: index + 1,
        thumbnail: scrapingData[index]?.thumbnail || video.ThumbnailURL, // Dùng thumbnail từ scraping nếu có
    }));

    youtubeTrends = combinedData; // Cập nhật dữ liệu vào bộ nhớ
    console.log("YouTube trends fetched successfully!");
};

// ==================== API Endpoints ====================

// API trả dữ liệu YouTube
app.get("/api/youtube-trends", async (req, res) => {
    await combineYouTubeData();  // Thu thập dữ liệu YouTube (API + Scraping) mỗi lần yêu cầu
    res.set('Cache-Control', 'no-store');  // Tắt cache
    res.json(youtubeTrends);  // Trả về dữ liệu xu hướng YouTube
});

// ==================== Khởi động server ====================

// Khởi động server
const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Fetching initial data...");

    // Thu thập dữ liệu ban đầu khi server khởi động
    await combineYouTubeData();

    // Đặt lịch tự động thu thập dữ liệu mỗi 1 phút cho YouTube
    setInterval(async () => {
        await combineYouTubeData();  // Thu thập YouTube trends (API + Scraping)
    }, 60000);  // 60000ms = 1 phút
});
