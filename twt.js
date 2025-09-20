const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron"); // Thêm thư viện node-cron

const app = express();
app.use(cors());

// Thư mục lưu trữ dữ liệu lịch sử
const dataDir = path.join(__dirname, "public", "twt"); // Thay đổi thư mục sang public/twt
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
}

// Bộ nhớ tạm lưu dữ liệu Twitter Trends
let twitterTrends = [];
const timeSlots = [
    "Now", "2 giờ trước", "4 giờ trước", "6 giờ trước",
    "8 giờ trước", "10 giờ trước", "12 giờ trước",
    "14 giờ trước", "16 giờ trước", "18 giờ trước",
    "20 giờ trước", "22 giờ trước", "24 giờ trước",
];

// Hàm lưu dữ liệu vào lịch sử
const saveHistory = () => {
    const nowFile = path.join(dataDir, "Now.json");
    const previousData = fs.existsSync(nowFile) ? JSON.parse(fs.readFileSync(nowFile)) : [];

    // Đẩy dữ liệu cũ xuống các khung giờ
    for (let i = timeSlots.length - 1; i > 0; i--) {
        const previousFile = path.join(dataDir, `${timeSlots[i - 1]}.json`);
        const currentFile = path.join(dataDir, `${timeSlots[i]}.json`);

        if (fs.existsSync(previousFile)) {
            const data = JSON.parse(fs.readFileSync(previousFile));
            fs.writeFileSync(currentFile, JSON.stringify(data, null, 2));
        }
    }

    // Cập nhật dữ liệu hiện tại
    twitterTrends = twitterTrends.map((newItem) => {
        const oldItem = previousData.find((item) => item.Content === newItem.Content);

        return {
            ...newItem,
            Tweets: parseInt(newItem.Tweets.replace(/\D/g, "")), // Chuyển đổi số tweet
            TweetsFormatted: newItem.Tweets, // Lưu định dạng gốc K/M
            ViewHistory: oldItem
                ? [...(oldItem.ViewHistory || []), parseInt(newItem.Tweets.replace(/\D/g, ""))].slice(-12)
                : [parseInt(newItem.Tweets.replace(/\D/g, ""))],
        };
    });

    fs.writeFileSync(nowFile, JSON.stringify(twitterTrends, null, 2));
    console.log("History updated!");
};

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
            if (index >= 30) return;
            twitterTrends.push({
                Rank: $(element).text().trim(),
                Content: $(contents[index]).text().trim(),
                Tweets: $(tweets[index]).text().trim(),
            });
        });

        console.log("Lấy dữ liệu xu hướng tweets X thành công!");
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error.message);
    }
};

// API trả dữ liệu hiện tại
app.get("/api/twitter-trends", (req, res) => {
    const nowFile = path.join(dataDir, "Now.json");
    if (fs.existsSync(nowFile)) {
        const data = JSON.parse(fs.readFileSync(nowFile));
        res.json(data);
    } else {
        res.status(404).json({ message: "Không có data khả dụng." });
    }
});

// API trả danh sách file lịch sử
app.get("/api/twitter-trends/history", (req, res) => {
    const files = timeSlots.map((slot) => {
        const filePath = path.join(dataDir, `${slot}.json`);
        return {
            time: slot,
            exists: fs.existsSync(filePath),
            url: fs.existsSync(filePath) ? `http://localhost:5005/twt/${slot}.json` : null,
        };
    });

    res.json(files);
});

// Serve static files for history
app.use("/twt", express.static(dataDir)); // Serve thư mục twt

// Khởi động server
const PORT = 5005;
app.listen(PORT, async () => {
    console.log(`Twitter Trends server is running on http://localhost:${PORT}`);
    await fetchTwitterTrends();
    saveHistory();

    // Lập lịch tự động thu thập dữ liệu mỗi 2 giờ
    cron.schedule("0 */2 * * *", async () => {
        console.log("Running cronjob: Fetching Twitter trends...");
        await fetchTwitterTrends();
        saveHistory();
    });
});
