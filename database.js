const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const MySQLStore = require('connect-mysql2')(session);

const app = express();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Bỏ secure nếu không dùng HTTPS
    store: new session.MemoryStore() // Hoặc cấu hình Redis/FileStore
}));
//app.use(session({
//    secret: 'your_secret_key',
//    resave: false, 
//    saveUninitialized: false,
//    cookie: { secure: false, httpOnly: true }, // Bỏ secure nếu không dùng HTTPS
//    store: new session.MemoryStore() // Hoặc cấu hình Redis/FileStore
//}));
app.use(cors({
    origin: 'http://localhost:9988', // Địa chỉ frontend của bạn
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
    const sql = "INSERT INTO `user` (`user_name`, `user_username`, `user_password`) VALUES ('"+ req.body.name +"', '"+ req.body.email +"', '"+ req.body.password +"')";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/signin', (req, res) => {
    const sql = "SELECT * FROM user WHERE `user_username` = ? AND `user_password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({ status: "Error", message: "Database query error" });
        }

        if (data.length > 0) {
            const user = data[0];
            req.session.name = user.user_name;
            req.session.email = user.user_username;
            req.session.password = user.user_password;

            req.session.save((err) => {
                if (err) {
                    console.error('Error saving session:', err);
                    return res.json({ status: "Error saving session" });
                }
                // Gửi response sau khi session đã được lưu
                const role = user.user_username === "trendssync@gmail.com" ? "admin" : "user";
                return res.json({
                    Login: true,
                    status: "Success",
                    role: role,
                    user: { name: user.user_name, email: user.user_username }
                });
            });
        } else {
            return res.json({ status: "Failed", message: "Invalid credentials" });
        }
    });
});

app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    // Lấy `user_id` lớn nhất hiện tại
    const getMaxID= "SELECT MAX(user_id) AS maxId FROM `user`";

    db.query(getMaxID, (err, result) => {
        if (err) {
            console.error("Database error:", err); 
            return res.status(500).json({ message: "Database error", error: err });
        }

        const newID = result[0].maxId ? result[0].maxId + 1 : 1;

        const sql = "INSERT INTO `user` (`user_id`, `user_name`, `user_username`, `user_password`) VALUES (?, ?, ?, ?)";
        const values = [
            newID, 
            req.body.name,
            req.body.email,
            req.body.password
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Database error:", err); 
                return res.status(500).json({ message: "Database error", error: err });
            }
            return res.status(200).json({ message: "User created successfully", data: data });
        });
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE user set user_name = ?, user_username = ?, user_password = ? WHERE user_id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Database error:", err); 
            return res.status(500).json({ message: "Database error", error: err });
        }
        return res.status(200).json({ message: "User updated successfully", data: data });
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM user WHERE user_id = ?";
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
app.get('/profile-server', (req, res) => {
    console.log('Session Data:', req.session);
    console.log(req.session.name);
    if (req.session && req.session.name) {
        const sql = "SELECT * FROM user WHERE `user_name` = ?";
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