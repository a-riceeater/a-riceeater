const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(require("serve-favicon")(path.join(__dirname, 'public', 'logo.png')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
})

app.get("/license", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "license.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', '404.html'));
})

app.listen(7076, () => {
    console.log('Listening on 7076')
})