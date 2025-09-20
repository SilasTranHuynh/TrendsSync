const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const app = express();
app.use(cors());

// Thư mục công khai lưu trữ lịch sử
const publicDir = path.join(__dirname, "public");
const dataDir = path.join(publicDir, "data");

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Bộ nhớ tạm lưu dữ liệu YouTube Trends
let youtubeTrends = [];

// Danh sách các khung giờ cố định
const timeSlots = [
    "Now", "2 giờ trước", "4 giờ trước", "6 giờ trước",
    "8 giờ trước", "10 giờ trước", "12 giờ trước",
    "14 giờ trước", "16 giờ trước", "18 giờ trước",
    "20 giờ trước", "22 giờ trước", "24 giờ trước",
];

// Hàm lưu dữ liệu vào khung giờ cố định
const saveHistory = () => {
    // Đọc dữ liệu hiện tại từ "Now" nếu tồn tại
    const nowFile = path.join(dataDir, "Now.json");
    const previousData = fs.existsSync(nowFile) ? JSON.parse(fs.readFileSync(nowFile)) : [];

    // Đẩy dữ liệu cũ xuống các khung giờ tiếp theo
    for (let i = timeSlots.length - 1; i > 0; i--) {
        const previousSlot = path.join(dataDir, `${timeSlots[i - 1]}.json`);
        const currentSlot = path.join(dataDir, `${timeSlots[i]}.json`);

        if (fs.existsSync(previousSlot)) {
            // Di chuyển dữ liệu từ khung giờ trước sang khung giờ sau
            const previousData = JSON.parse(fs.readFileSync(previousSlot));
            fs.writeFileSync(currentSlot, JSON.stringify(previousData, null, 2));
        }
    }

    // Xử lý dữ liệu hiện tại
    youtubeTrends = youtubeTrends.map((newItem) => {
        const oldItem = previousData.find((item) => item.Title === newItem.Title);

        return {
            ...newItem,
            // Cập nhật ViewHistory bằng cách cộng thêm View trước đó
            ViewHistory: oldItem
                ? [...(oldItem.ViewHistory || []), parseInt(newItem.Views)].slice(-12) // Giữ tối đa 12 điểm
                : [parseInt(newItem.Views)],
        };
    });

    // Lưu dữ liệu mới vào "Now"
    fs.writeFileSync(nowFile, JSON.stringify(youtubeTrends, null, 2));
    console.log(`Updated history: New data saved to Now.json`);
};



// Hàm thu thập dữ liệu từ YouTube API
const fetchYouTubeTrends = async () => {
    const apiKey = 'AIzaSyB5xkShZYYRUE4PjfTo1D_O42YRjeJgMis'; 
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
            Image: video.snippet.thumbnails.high.url,
        }));

        console.log("YouTube trends fetched successfully!");
    } catch (error) {
        console.error("Error fetching YouTube trends:", error.message);
    }
};

// Serve static files for history
app.use("/data", express.static(dataDir));

// API trả danh sách file lịch sử
app.get("/api/youtube-trends/history", (req, res) => {
    const files = timeSlots.map(slot => {
        const filePath = path.join(dataDir, `${slot}.json`);
        return {
            time: slot,
            exists: fs.existsSync(filePath),
            url: fs.existsSync(filePath) ? `http://localhost:5001/data/${slot}.json` : null,
        };
    });

    res.json(files);
});

// API trả dữ liệu YouTube Trends hiện tại
app.get("/api/youtube-trends", (req, res) => {
    const nowFile = path.join(dataDir, "Now.json");
    if (fs.existsSync(nowFile)) {
        const data = JSON.parse(fs.readFileSync(nowFile));
        res.json(data);
    } else {
        res.status(404).json({ message: "No data available" });
    }
});


// Khởi động server
const PORT = 5001;
app.listen(PORT, async () => {
    console.log(`YouTube server is running on http://localhost:${PORT}`);
    await fetchYouTubeTrends();
    saveHistory(); // Lưu lịch sử sau khi fetch dữ liệu mới
});

// Cronjob: Thu thập dữ liệu và lưu lịch sử mỗi 2 giờ
cron.schedule("0 */2 * * * *", async () => {
    console.log("Running cronjob: Fetching YouTube trends...");
    await fetchYouTubeTrends();
    saveHistory(); // Cập nhật lịch sử
});
