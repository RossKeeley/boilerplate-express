var express = require('express');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
console.log("Hello World");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({"message": "HELLO JSON"});
  }
  res.json({"message": "Hello json"});
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({echo: word});
});

app.route("/name").get((req, res) => {
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.send({"name": firstname + " " +  lastname});
}).post();

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({name: string});
});






























 module.exports = app;
