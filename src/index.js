require("dotenv").config()
const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();

const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: 465,
    auth: {
        user: process.env.user,
        pass: process.env.password
    }
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
    message: {
        sucess: false,
        rateLimit: true
    },
    statusCode: 200
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(require("serve-favicon")(path.join(__dirname, 'public', 'logo.png')));
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
})

app.get("/license", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "license.html"))
})

app.post("/api/send-message", limiter, (req, res) => {
    if (!req.body.email || !req.body.name || !req.body.message) return res.send({ sucess: false })
    if (!req.body.email.trim() || !req.body.name.trim() || !req.body.message.trim()) return res.send({ sucess: false })
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email.trim())) return

    var mailOptions = {
        from: process.env.user.trim(),
        to: req.body.email.trim(),
        subject: 'Recieved message from portfolio',
        text: `Begin message from "${req.body.name.trim()}", ${req.body.email.trim()}: \n${req.body.message.trim()}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send({ success: false })
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ success: true });
        }
    });

    res.send({ success: true })
})

app.get("/message-sent", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "message-sent.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', '404.html'));
})

app.listen(7076, () => {
    console.log('Listening on 7076')
})