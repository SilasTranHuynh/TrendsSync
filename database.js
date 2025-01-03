const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        }
        else
        {
            return res.json("Failed");
        }
    })
})

app.listen(3307, () => {
    console.log("Listening...");
})