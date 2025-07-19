const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

// middlewre 
app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Router
const userRoute = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");

app.use("/user", userRoute);
app.use("/message", messageRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;