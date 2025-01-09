const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const app = express();
app.use(cors());

// Thư mục lưu trữ dữ liệu
const publicDir = path.join(__dirname, "public");
const dataDir = path.join(publicDir, "tiktok");

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Bộ nhớ tạm lưu dữ liệu TikTok
let tiktokTrends = [];
const timeSlots = [
    "Now", "2 giờ trước", "4 giờ trước", "6 giờ trước",
    "8 giờ trước", "10 giờ trước", "12 giờ trước",
    "14 giờ trước", "16 giờ trước", "18 giờ trước",
    "20 giờ trước", "22 giờ trước", "24 giờ trước",
];

// Hàm lưu dữ liệu vào lịch sử
const formatView = (view) => {
    if (view >= 1_000_000) {
        return `${(view / 1_000_000).toFixed(1)}M`; // Chuyển thành triệu
    } else if (view >= 1_000) {
        return `${(view / 1_000).toFixed(1)}K`; // Chuyển thành nghìn
    } else {
        return `${view}`; // Giữ nguyên nếu nhỏ hơn 1000
    }
};

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
    tiktokTrends = tiktokTrends.map((newItem) => {
        const oldItem = previousData.find((item) => item.Hashtag === newItem.Hashtag);

        return {
            ...newItem,
            Views: formatView(newItem.Views), // Thêm chữ "M" hoặc "K" vào Views
            ViewHistory: oldItem
                ? [...(oldItem.ViewHistory || []), formatView(newItem.Views)].slice(-12) // Định dạng từng phần tử ViewHistory
                : [formatView(newItem.Views)],
        };
    });

    fs.writeFileSync(nowFile, JSON.stringify(tiktokTrends, null, 2));
    console.log("History updated!");
};


// Hàm thu thập dữ liệu từ TikTok
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
            const rank = $(element).text().trim();
            const hashtag = $(hashtags[index]).text().trim();
            const viewsNow = parseInt($(views[index]).text().replace(/\D/g, ""));

            tiktokTrends.push({
                Rank: rank,
                Hashtag: hashtag,
                Views: viewsNow,
            });
        });

        console.log("TikTok trends fetched successfully!");
    } catch (error) {
        console.error("Error fetching TikTok trends:", error.message);
    }
};

// Serve static files for history
app.use("/data", express.static(dataDir));

// API trả dữ liệu hiện tại
app.get("/api/tiktok-trends", (req, res) => {
    const nowFile = path.join(dataDir, "Now.json");
    if (fs.existsSync(nowFile)) {
        let data = JSON.parse(fs.readFileSync(nowFile));

        // Định dạng lại dữ liệu nếu cần
        data = data.map(item => ({
            ...item,
            Views: formatView(parseInt(item.Views.replace(/[^0-9]/g, ""))), // Đảm bảo Views được định dạng
            ViewHistory: item.ViewHistory.map(view => formatView(parseInt(view.replace(/[^0-9]/g, "")))),
        }));

        res.json(data);
    } else {
        res.status(404).json({ message: "No data available" });
    }
});


// API trả danh sách file lịch sử
app.get("/api/tiktok-trends/history", (req, res) => {
    const files = timeSlots.map((slot) => {
        const filePath = path.join(dataDir, `${slot}.json`);
        return {
            time: slot,
            exists: fs.existsSync(filePath),
            url: fs.existsSync(filePath) ? `http://localhost:5002/data/${slot}.json` : null,
        };
    });

    res.json(files);
});

// Khởi động server
const PORT = 5002;
app.listen(PORT, async () => {
    console.log(`TikTok server is running on http://localhost:${PORT}`);
    await fetchTikTokTrends();
    saveHistory();

    cron.schedule("0 */2 * * * *", async () => {
        console.log("Fetching TikTok trends...");
        await fetchTikTokTrends();
        saveHistory();
    });
});
