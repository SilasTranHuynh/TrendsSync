const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const filePath = 'data.json';

// Đọc dữ liệu từ file JSON khi server khởi động
let nowData = [];
let oneHourAgoData = [];
if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(fileData);
    nowData = jsonData.now || [];
    oneHourAgoData = jsonData.oneHourAgo || [];
}

// Endpoint để nhận dữ liệu từ Python và cập nhật dữ liệu
app.post('/api/upload-data', (req, res) => {
    const newData = req.body;

    // Cập nhật dữ liệu: chuyển 'nowData' thành 'oneHourAgoData' và lưu 'newData' vào 'nowData'
    oneHourAgoData = nowData;  // Chuyển dữ liệu hiện tại sang 1 giờ trước
    nowData = newData;  // Lưu dữ liệu mới vào Now

    // Ghi dữ liệu vào file JSON
    fs.writeFileSync(filePath, JSON.stringify({ now: nowData, oneHourAgo: oneHourAgoData }, null, 2));

    res.status(200).json({ message: 'Dữ liệu đã được cập nhật!' });
});

// Endpoint để lấy dữ liệu của cả "Now" và "1 giờ trước"
app.get('/api/get-hashtags', (req, res) => {
    res.status(200).json({
        now: nowData,
        oneHourAgo: oneHourAgoData
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
