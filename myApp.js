require('dotenv').config()
let express = require('express');
let app = express();
// app.get('/', (req, res) => res.send("Hello Express"))
let absolutePath = __dirname + '/views/index.html';
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
})
app.get('/', (req, res) => res.sendFile(absolutePath));

let message = "Hello json";

app.get('/json', (req, res) => res.json({"message" : (process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message)}))
app.use('/public', express.static(__dirname + '/public'))

console.log("Hello World")


































module.exports = app;
