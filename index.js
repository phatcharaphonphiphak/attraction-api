const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const app = express();

app.use(cors());

app.get('/helloworld', function(req, res, next) {
    res.json({msg: "Hello, World!"});
});

app.get('/attractions', function(req, res, next) {
    pool.query("SELECT * FROM attractions", function(err, rows, fields) {
        if (err) {
            console.error('Error fetching attractions:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
