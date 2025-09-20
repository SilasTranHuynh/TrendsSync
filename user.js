const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const MySQLStore = require('connect-mysql2')(session);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Bỏ secure nếu không dùng HTTPS
    store: new session.MemoryStore() // Hoặc cấu hình Redis/FileStore
}));

app.use(cors({
    origin: 'http://localhost:9988', 
    credentials: true, // Cho phép gửi cookie
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trendssync",
    port: 3306
})

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.json("Error hashing password");
        }

        const sql = "INSERT INTO users (user_name, user_username, user_password) VALUES (?, ?, ?)";
        const values = [name, email, hashedPassword];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.json("Lỗi lưu người dùng");
            }
            return res.json("Đăng kí thành công");
        });
    });
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE `user_username` = ?";

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ status: "Lỗi", message: "Lỗi" });
        }

        if (data.length === 0) {
            return res.json({ status: "Thất bại", message: "Không tìm thấy người dùng" });
        }
        const user = data[0];
        bcrypt.compare(password, user.user_password, (err, result) => {
            if (err) {
                console.error('Kiểm tra lỗi bcrypt: ', err);
                return res.status(500).json({ status: "Lỗi", message: "Lỗi so sánh mật khẩu" });
            }

            console.log('Kết quả so sánh bcrypt: ', result);
            if (result) {
                const payload = {
                    email: user.user_username,
                    name: user.user_name
                }
                const access_token = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET, 
                        { expiresIn: process.env.JWT_EXPIRE })
                return res.json({ status: "Success", role: user.role, user: {name: user.user_name, email: user.user_username}, access_token });
            } else {
                return res.status(401).json({ status: "Thất bại", message: "Mật khẩu không chính xác." });
            }
        });
    });
});


app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    // Lấy `user_id` lớn nhất hiện tại
    const getMaxID= "SELECT MAX(user_id) AS maxId FROM `users`";

    db.query(getMaxID, (err, result) => {
        if (err) {
            console.error("Database error:", err); 
            return res.status(500).json({ message: "Database error", error: err });
        }

        const newID = result[0].maxId ? result[0].maxId + 1 : 1;

        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({ message: "Error hashing password" });
            }

            const sql = "INSERT INTO `users` (`user_id`, `user_name`, `user_username`, `user_password`) VALUES (?, ?, ?, ?)";
            const values = [
                newID, 
                req.body.name,
                req.body.email,
                hashedPassword
            ];

            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error("Lỗi: ", err); 
                    return res.status(500).json({ message: "Lỗi", error: err });
                }
                return res.status(200).json({ message: "Tạo người dùng thành công.", data: data });
            });
        });
    });
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;

    const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({ message: "Error hashing password" });
            }
            const sql = "UPDATE users set user_name = ?, user_username = ?, user_password = ? WHERE user_id = ?";
            const values = [
                req.body.name,
                req.body.email,
                hashedPassword
            ]
        db.query(sql, [...values, id], (err, data) => {
            if (err) {
                console.error("Database error:", err); 
                return res.status(500).json({ message: "Lỗi", error: err });
            }
            return res.status(200).json({ message: "Cập nhật người dùng thành công.", data: data });
        })
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE user_id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Database error:", err); 
            return res.status(500).json({ message: "Database error", error: err });
        }
        return res.status(200).json({ message: "User deleted successfully", data: data });
    })
})

// Test
app.get('/profile', (req, res) => {
    console.log('Session Data:', req.session);
    console.log(req.session.name);
    if (req.session && req.session.name) {
        const sql = "SELECT * FROM users WHERE `user_name` = ?";
        db.query(sql, [req.session.name], (err, data) => {
            if (err) {
                return res.json({ status: "Error", message: "Database error" });
            }
            if (data.length > 0) {
                return res.json({ status: "Success", user: data[0] });
            } else {
                return res.json({ status: "Failed", message: "User not found" });
            }
        });
    } else {
        return res.json({ status: "Failed", message: "Not logged in" });
    }
});


app.listen(3307, () => {
    console.log("Listening...");
})