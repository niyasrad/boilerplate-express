require('dotenv').config()
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
// app.get('/', (req, res) => res.send("Hello Express"))
let absolutePath = __dirname + '/views/index.html';
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
})
app.get('/', (req, res) => res.sendFile(absolutePath));

let message = "Hello json";

app.get('/json', (req, res) => res.json({"message" : (process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message)}))
app.use('/public', express.static(__dirname + '/public'))

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time" : req.time});
})

app.get('/:word/echo', (req, res) => res.json({"echo": req.params.word}))

app.get('/name', (req, res) => res.json({"name": req.query.first + " " +req.query.last}))
app.post('/name', (req, res) => {
    res.json({"name": req.body.first + " " +req.body.last}) 
})


































module.exports = app;
