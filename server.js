const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());  // Cho phép server nhận dữ liệu JSON từ request

// Biến lưu trữ dữ liệu cào được (tạm thời)
let scrapedData = [];

// Route để nhận dữ liệu từ script cào
app.post('/api/upload-data', (req, res) => {
    scrapedData = req.body;  // Lưu dữ liệu cào vào biến `scrapedData`
    console.log('Dữ liệu đã nhận:', scrapedData);
    res.status(200).json({ message: 'Data received successfully' });
});

// Route để gửi dữ liệu tới frontend React
app.get('/api/get-data', (req, res) => {
    res.json(scrapedData);
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
