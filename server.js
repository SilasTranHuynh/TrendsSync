require('dotenv').config();
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const PORT = process.env.PORT_POST;
const publicDir = path.join(__dirname, "public");
const dataDir = path.join(publicDir, "reddit");


const apiKey = process.env.NEWS_API_KEY;

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Danh sách các khung giờ cố định
const timeSlots = [
    "Now", "2 giờ trước", "4 giờ trước", "6 giờ trước",
    "8 giờ trước", "10 giờ trước", "12 giờ trước",
    "14 giờ trước", "16 giờ trước", "18 giờ trước",
    "20 giờ trước", "22 giờ trước", "24 giờ trước",
];

// Bộ nhớ tạm cho dữ liệu Reddit Trends
let redditTrends = [];
let tokenCache = null;

// Lấy token từ Reddit API
const fetchRedditToken = async () => {
    const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            new URLSearchParams({ grant_type: 'client_credentials' }),
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': process.env.REDDIT_USER_AGENT,
                },
            }
        );
        tokenCache = response.data.access_token;
        console.log("Reddit token fetched successfully!");
    } catch (error) {
        console.error("Error fetching Reddit token:", error.message);
    }
};

// Thu thập dữ liệu từ Reddit
const fetchRedditTrends = async () => {
    if (!tokenCache) await fetchRedditToken();

    try {
        const response = await axios.get('https://oauth.reddit.com/r/all/top', {
            headers: {
                Authorization: `Bearer ${tokenCache}`,
                'User-Agent': process.env.REDDIT_USER_AGENT,
            },
            params: { t: 'day', limit: 30 },
        });

        redditTrends = response.data.data.children.map(post => ({
            Title: post.data.title,
            Author: post.data.author,
            Time: new Date(post.data.created_utc * 1000).toLocaleString(),
            Thumbnail: post.data.thumbnail.startsWith('http') ? post.data.thumbnail : '',
            Upvotes: post.data.score,
        }));

        console.log("Lấy dữ liệu thịnh hành Reddit thành công!");
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error.message);
    }
};

// Lưu dữ liệu vào khung giờ cố định
const saveHistory = () => {
    const nowFile = path.join(dataDir, "Now.json");
    const previousData = fs.existsSync(nowFile) ? JSON.parse(fs.readFileSync(nowFile)) : [];

    // Đẩy dữ liệu cũ xuống các khung giờ tiếp theo
    for (let i = timeSlots.length - 1; i > 0; i--) {
        const previousSlot = path.join(dataDir, `${timeSlots[i - 1]}.json`);
        const currentSlot = path.join(dataDir, `${timeSlots[i]}.json`);

        if (fs.existsSync(previousSlot)) {
            const previousSlotData = JSON.parse(fs.readFileSync(previousSlot));
            fs.writeFileSync(currentSlot, JSON.stringify(previousSlotData, null, 2));
        }
    }

    // Cập nhật dữ liệu hiện tại
    const updatedTrends = redditTrends.map(newItem => {
        const oldItem = previousData.find(item => item.Title === newItem.Title);
        return {
            ...newItem,
            ViewHistory: oldItem ? [...(oldItem.ViewHistory || []), newItem.Upvotes].slice(-12) : [newItem.Upvotes],
        };
    });

    fs.writeFileSync(nowFile, JSON.stringify(updatedTrends, null, 2));
    console.log("History updated: Saved new data to Now.json");
};

// API trả danh sách lịch sử
app.get("/api/reddit-trends/history", (req, res) => {
    const files = timeSlots.map(slot => {
        const filePath = path.join(dataDir, `${slot}.json`);
        return {
            time: slot,
            exists: fs.existsSync(filePath),
            url: fs.existsSync(filePath) ? `http://localhost:3000/reddit/${slot}.json` : null,
        };
    });
    res.json(files);
});

// API trả dữ liệu Reddit Trends hiện tại
app.get("/api/reddit-trends", (req, res) => {
    const nowFile = path.join(dataDir, "Now.json");
    if (fs.existsSync(nowFile)) {
        res.json(JSON.parse(fs.readFileSync(nowFile)));
    } else {
        res.status(404).json({ message: "No data available" });
    }
});

// File lưu trữ lịch sử
app.use("/reddit", express.static(dataDir));

// Cronjob: Thu thập dữ liệu và cập nhật lịch sử mỗi 2 giờ
cron.schedule("0 */2 * * *", async () => {
    console.log("Khởi động cronjob: Lấy dữ liệu từ thịnh hành Reddit...");
    await fetchRedditTrends();
    saveHistory();
});


//Route để lấy tin tức nổi bật
app.get('/top-headlines', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us', // Mã quốc gia
                apiKey: apiKey,
               pageSize: 30,
            },
        });

        let newsposts = [];

        if (response.data && response.data.articles) {
            newsposts = response.data.articles.map((newspost) => ({
                newsSource: newspost.source.name, // Nguồn tin
               newsTitle: newspost.title, // Tiêu đề bài viết
                newsAuthor: newspost.author || 'Unknown', // Tác giả (có thể là rỗng)
                thumbnailUrl: newspost.urlToImage, // URL hình ảnh
                newsTime: new Date(newspost.publishedAt).toLocaleString(), // Thời gian xuất bản
           }));
            res.json({ newsposts });
       } else {
            console.error('No articles found', response.data);
           res.status(404).json({ message: 'No articles found' });
        }
    } catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Failed to fetch news' });
    }
});

// Chức năng gửi mail góp ý
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.json());

app.get('/', (request, response) => {
    response.render('contact', { error : ''});
})

app.post('/send-mail', 
    [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid Email Address'),
    check('message').notEmpty().withMessage('Message is required')
    ], (request, response) => {
    const error = validationResult(request);
    if(!error.isEmpty())
    {
        response.render('contact', {errors : errors.mapped()});
    }
    else {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'trendssync@gmail.com',
                pass: 'nubltvyqyayigcgl' // App password
            }
        });
        const mail_option = {
            from: request.body.email,
            to: 'anhthv21@gmail.com',
            text: `Name: ${request.body.name}\nEmail: ${request.body.email}\nMessage: ${request.body.message}`,
        };
        transporter.sendMail(mail_option, (error, info) => {
            if(error)
            {
                console.log(error);
            }
            else
            {
                response.redirect('/');
            }
        });
    }
})

// Khởi động server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await fetchRedditTrends();
    saveHistory();
});
