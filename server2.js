const express = require("express");
const cors = require("cors");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const axios = require("axios");
const cheerio = require("cheerio");
const { google } = require("googleapis");

const app = express();
app.use(cors());

// Bộ nhớ tạm để lưu dữ liệu
let googleTrendsData = [];
let tiktokTrends = [];
let twitterTrends = [];
let youtubeTrends = [];
let categoryTrendData = [];

// ==================== Google Trends ====================

// Hàm thu thập dữ liệu từ Google Trends bằng Selenium
const fetchGoogleTrends = async () => {
    let driver;
    try {
        // Cấu hình WebDriver với Chrome
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless'); // Chạy không hiển thị giao diện trình duyệt
        chromeOptions.addArguments('--disable-dev-shm-usage');
        chromeOptions.addArguments('--no-sandbox');

        driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();

        // Mở trang Google Trends
        await driver.get("https://trends.google.com/trending?geo=VN");
        await driver.sleep(5000); // Đợi trang tải xong (tùy theo tốc độ mạng)

        // Tìm tất cả các thẻ chứa thông tin xu hướng
        const trends = await driver.findElements(By.css('tr[jsname="oKdM2c"]'));

        googleTrendsData = []; // Xóa dữ liệu cũ

        // Duyệt qua các xu hướng và lấy thông tin
        for (let i = 0; i < trends.length; i++) {
            const trend = trends[i];

            // Lấy tên xu hướng từ class mZ3RIc
            let title = await trend.findElement(By.className('mZ3RIc')).getText().catch(() => "Không có dữ liệu");

            // Lấy lượng tìm kiếm từ class lqv0Cb
            let searchVolume = await trend.findElement(By.className('lqv0Cb')).getText().catch(() => "Không có dữ liệu");

            // Thêm vào dữ liệu xu hướng
            googleTrendsData.push({ Rank: i + 1, Title: title, SearchVolume: searchVolume });
        }

        console.log("Lấy dữ liệu Google Trends thành công");
    } catch (error) {
        console.error("Lỗi lấy dữ liệu Google Trends:", error);
    } finally {
        if (driver) {
            await driver.quit(); // Đóng trình duyệt
        }
    }
};

// ==================== YouTube Trends ====================

// Hàm thu thập dữ liệu YouTube
const fetchYouTubeTrends = async () => {
    const apiKey = 'AIzaSyB5xkShZYYRUE4PjfTo1D_O42YRjeJgMis'; // API key 
    const youtube = google.youtube({ version: "v3", auth: apiKey });

    try {
        const response = await youtube.videos.list({
            part: "snippet,statistics",
            chart: "mostPopular",
            regionCode: "VN",
            maxResults: 30,
            videoCategoryId: "10", // ID danh mục âm nhạc
        });

        youtubeTrends = response.data.items.map(video => ({
            Title: video.snippet.title,
            Channel: video.snippet.channelTitle,
            Views: video.statistics.viewCount,
            URL: `https://www.youtube.com/watch?v=${video.id}`,
            Image: video.snippet.thumbnails.high.url, // Thêm hình ảnh thumbnail
        }));

        console.log("Lấy dữ liệu thịnh hành Youtube thành công!");
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error.message);
    }
};

// ==================== TikTok Trends ====================

// Hàm thu thập dữ liệu TikTok
const fetchTikTokTrends = async () => {
    const url = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/vi";
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    };

    try {
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);

        const ranks = $(".RankingStatus_rankingIndex__ZMDrH");
        const hashtags = $(".CardPc_titleText__RYOWo");
        const views = $(".CardPc_itemValue__XGDmG");

        tiktokTrends = [];
        ranks.each((index, element) => {
            tiktokTrends.push({
                Rank: $(element).text().trim(),
                Hashtag: $(hashtags[index]).text().trim(),
                Views: $(views[index]).text().trim(),
            });
        });

        console.log("Lấy dữ liệu thịnh hành Tiktok thành công!");
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error.message);
    }
};

// ==================== Twitter Trends ====================

// Hàm thu thập dữ liệu Twitter
const fetchTwitterTrends = async () => {
    const url = "https://getdaytrends.com/vietnam/";
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    };

    try {
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);

        const rankings = $("th.pos");
        const contents = $("a.string");
        const tweets = $("div.desc");

        twitterTrends = [];
        rankings.each((index, element) => {
            if (index >= 30) return;  // Nếu index >= 30 thì không thêm vào
            twitterTrends.push({
                Rank: $(element).text().trim(),
                Content: $(contents[index]).text().trim(),
                Tweets: $(tweets[index]).text().trim(),
            });
        });

        console.log("Lấy dữ liệu thịnh hành X thành công!");
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error.message);
    }
};

// ==================== Topic Category Trends ====================
const fetchCategoryTrends = async () => {
    let driver;
    try {
        // Cấu hình WebDriver với Chrome
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless'); // Chạy không hiển thị giao diện trình duyệt
        chromeOptions.addArguments('--disable-dev-shm-usage');
        chromeOptions.addArguments('--no-sandbox');

        driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();

        await driver.get("https://explodingtopics.com/topics-last-2-years-by-growth");
        await driver.sleep(5000); // Chờ trang tải xong

        const trends = await driver.findElements(By.className('tileStyle cardHover'));

        categoryTrendData = []; // Xóa dữ liệu cũ

        // Duyệt qua các xu hướng và lấy thông tin
           
        for (let i = 0; i < trends.length; i++) {
            const trend = trends[i];
        
            // Lấy tên xu hướng
            let title = await trend.findElement(By.className('tileKeyword')).getText().catch(() => "Không có dữ liệu");
        
            // Lấy sự tăng trưởng của xu hướng
            let searchVolume = await trend.findElement(By.className('scoreTagTop.growth.scoreTagGradient')).getText().catch(() => "Không có dữ liệu");
        
            // Thêm vào dữ liệu xu hướng
            categoryTrendData.push({ Rank: i + 1, Title: title, SearchVolume: searchVolume });
        }
    } catch (error) {
        console.error("Error fetching Topic Trends:", error);
    } finally {
        if (driver) {
            await driver.quit(); // Đóng trình duyệt
        }
    }
};

// ==================== API Endpoints ====================

// API trả dữ liệu Google Trends
app.get("/api/google-trends", async (req, res) => {
    await fetchGoogleTrends();  // Thu thập lại dữ liệu Google Trends mỗi lần yêu cầu
    res.set('Cache-Control', 'no-store');  // Tắt cache
    res.json(googleTrendsData);  // Trả về dữ liệu xu hướng Google Trends
});

// API trả dữ liệu YouTube
app.get("/api/youtube-trends", async (req, res) => {
    await fetchYouTubeTrends();  // Thu thập lại dữ liệu YouTube mỗi lần yêu cầu
    res.set('Cache-Control', 'no-store');  // Tắt cache
    res.json(youtubeTrends);  // Trả về dữ liệu xu hướng YouTube
});

// API trả dữ liệu TikTok
app.get("/api/tiktok-trends", async (req, res) => {
    await fetchTikTokTrends();  // Thu thập lại dữ liệu TikTok mỗi lần yêu cầu
    res.set('Cache-Control', 'no-store');  // Tắt cache
    res.json(tiktokTrends);  // Trả về dữ liệu xu hướng TikTok
});

// API trả dữ liệu Twitter
app.get("/api/twitter-trends", async (req, res) => {
    await fetchTwitterTrends();  // Thu thập lại dữ liệu Twitter mỗi lần yêu cầu
    res.set('Cache-Control', 'no-store');  // Tắt cache
    res.json(twitterTrends);  // Trả về dữ liệu xu hướng Twitter
});

// API trả dữ liệu Categories
app.get("/api/top-categories", async (req, res) => {
    try {
        await fetchCategoryTrends();
        res.set('Cache-Control', 'no-store'); // Tắt cache
        res.json(categoryTrendData); // Trả về dữ liệu xu hướng
    } catch (error) {
        console.error("Error in /api/top-categories route:", error);
        res.status(500).json({ error: "Failed to fetch category trends" });
    }
});


// ==================== Khởi động server ====================

// Khởi động server
const PORT = 4900;
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Fetching initial data...");

    // Thu thập dữ liệu ban đầu khi server khởi động
    await fetchGoogleTrends();
    await fetchYouTubeTrends();
    await fetchTikTokTrends();
    await fetchTwitterTrends();
    await fetchCategoryTrends();

    // Đặt lịch tự động thu thập dữ liệu mỗi 60 phút (1 giờ) cho Google, TikTok, Twitter
    setInterval(async () => {
        await fetchGoogleTrends();  // Thu thập Google Trends
        await fetchTikTokTrends();   // Thu thập TikTok Trends
        await fetchTwitterTrends();  // Thu thập Twitter Trends
        await fetchCategoryTrends();
    }, 3600000);  // 3600000ms = 1 giờ

    // Đặt lịch tự động thu thập dữ liệu mỗi 1 phút cho YouTube
    setInterval(async () => {
        await fetchYouTubeTrends();  // Thu thập YouTube Trends
    }, 60000);  // 60000ms = 1 phút
});