const express = require("express");
const cors = require("cors");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const app = express();
app.use(cors());

// Thư mục lưu trữ dữ liệu lịch sử
const dataDir = path.join(__dirname, "public", "gg");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Bộ nhớ tạm lưu dữ liệu Google Trends
let googleTrendsData = [];
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
    googleTrendsData = googleTrendsData.map((newItem) => {
        const oldItem = previousData.find((item) => item.Title === newItem.Title);

        return {
            ...newItem,
            ViewHistory: oldItem
                ? [...(oldItem.ViewHistory || []), parseInt(newItem.SearchVolume.replace(/\D/g, ""))].slice(-12)
                : [parseInt(newItem.SearchVolume.replace(/\D/g, ""))],
        };
    });

    fs.writeFileSync(nowFile, JSON.stringify(googleTrendsData, null, 2));
    console.log("Google Trends history updated!");
};

// Hàm thu thập dữ liệu Google Trends
const fetchGoogleTrends = async () => {
    let driver;
    try {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

        driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
        await driver.get("https://trends.google.com/trending?geo=VN");
        await driver.sleep(5000);

        const trends = await driver.findElements(By.css('tr[jsname="oKdM2c"]'));
        googleTrendsData = [];

        for (let i = 0; i < trends.length; i++) {
            const trend = trends[i];
            let title = await trend.findElement(By.className("mZ3RIc")).getText().catch(() => "Không có dữ liệu");
            let searchVolume = await trend.findElement(By.className("lqv0Cb")).getText().catch(() => "Không có dữ liệu");

            googleTrendsData.push({ Rank: i + 1, Title: title, SearchVolume: searchVolume });
        }

        console.log("Google Trends data fetched successfully!");
    } catch (error) {
        console.error("Error fetching Google Trends:", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
};

// API trả dữ liệu hiện tại
app.get("/api/google-trends", (req, res) => {
    const nowFile = path.join(dataDir, "Now.json");
    if (fs.existsSync(nowFile)) {
        const data = JSON.parse(fs.readFileSync(nowFile));
        res.json(data);
    } else {
        res.status(404).json({ message: "No data available" });
    }
});

// API trả danh sách file lịch sử
app.get("/api/google-trends/history", (req, res) => {
    const files = timeSlots.map((slot) => {
        const filePath = path.join(dataDir, `${slot}.json`);
        return {
            time: slot,
            exists: fs.existsSync(filePath),
            url: fs.existsSync(filePath) ? `http://localhost:5004/public/gg/${slot}.json` : null,
        };
    });

    res.json(files);
});

// Khởi động server
const PORT = 5004;
app.listen(PORT, async () => {
    console.log(`Google Trends server is running on http://localhost:${PORT}`);
    await fetchGoogleTrends();
    saveHistory();

    // Lập lịch tự động thu thập dữ liệu mỗi 2 giờ
    cron.schedule("0 */2 * * * *", async () => {
        console.log("Fetching Google Trends...");
        await fetchGoogleTrends();
        saveHistory();
    });
});
