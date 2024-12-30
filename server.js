require('dotenv').config();
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome")
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT_POST;

const cors = require('cors');
app.use(cors());

let tokenCache = null;

const apiKey = process.env.NEWS_API_KEY;

// Lấy token từ Reddit OAuth
app.get('/getToken', async (req, res) => {
    const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            new URLSearchParams({
                grant_type: 'client_credentials',
            }),
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': process.env.REDDIT_USER_AGENT,
                },
            },
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error retrieving token');
    }
});

// API để lấy các bài viết nổi bật của Reddit
app.get('/top-posts', async (req, res) => {
    try {
        if (!tokenCache) {
            const tokenResponse = await axios.get('http://localhost:3000/getToken');
            tokenCache = tokenResponse.data.access_token;
        }

        const redditResponse = await axios.get('https://oauth.reddit.com/r/all/top', {
            headers: {
                Authorization: `Bearer ${tokenCache}`,
                'User-Agent': process.env.REDDIT_USER_AGENT,
            },
            params: {
                t: 'day', // Lấy bài viết nổi bật trong ngày
                limit: 30, // Giới hạn số lượng bài viết
            },
        });

        const redditTrends = redditResponse.data.data.children.map((redditTrend) => ({
            redditAuthor: redditTrend.data.author,
            redditTime: new Date(redditTrend.data.created_utc * 1000).toLocaleString(),
            thumbnailUrl: redditTrend.data.thumbnail.startsWith('http') ? redditTrend.data.thumbnail : '',
            redditTitle: redditTrend.data.title,
            redditUpvotes: `↑ ${redditTrend.data.score}`,
        }));
        res.json(redditTrends);
    } catch (error) {
        console.error('Error: ', error.response ? error.response.data : error.message);
        res.status(500).send('Error retrieving top posts');
    }
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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
