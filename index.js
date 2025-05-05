// var http = require('http'),
//  fs = require('fs'),
//  url = require('url'),
//  choices = ["No pressure, no diamonds",
//  "Be yourself, everyone else is already taken",
//  "So many books, so little time",
//  "Aspire to inspire before we expire",
//  "Stay foolish to stay sane",
//  "When nothing goes right, go left",
//  "Try Again. Fail again. Fail better",
//  "Don’t tell people your plans. Show them your results"
//  ];
// http.createServer(function(request, response){
//  var path = url.parse(request.url).pathname;
//  if(path=="/getstring"){
//  console.log("request recieved");
//  var string = choices[Math.floor(Math.random()*choices.length)];
//  console.log("string '" + string + "' chosen");
//  response.writeHead(200, {"Content-Type": "text/plain"});
//  response.end(string);
//  console.log("string sent");
//  } else {
//  fs.readFile('./index.html', function(err, file) {
//  if(err) {
//  // write an error response or nothing here
// return;
//  }
//  response.writeHead(200, { 'Content-Type': 'text/html' });
//  response.end(file, "utf-8");
//  });
//  }
// }).listen(8001);
// console.log("server initialized");
// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.get("/", function (req, res) {
//   // assuming index.html is in the same directory as this script
//   res.sendFile(__dirname + "/index.html");
//   // Specifying the root path is more useful
//   // res.sendFile('index.html', { root: __dirname });
// });
// app.post("/demo", function (req, res) {
//   var name = "<b>" + req.body.name + "</b>";
//   res.send(name + " Submitted Successfully!");
// });
// var server = app.listen(8001, function () {
//   console.log("Node server is running..");
// });
//

var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var app = express();
var schemaName = new Schema(
  {
    request: String,
    title: String,
    id: Number,
  },
  {
    collection: "test",
  }
);
schemaName.index({ request: "text" }, { name: "request_text_index" });
var Model = mongoose.model("Model", schemaName);
mongoose.connect(
  "mongodb+srv://denisaghiriti7:Adriana-2003@cluster0.flkixsq.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(express.static(__dirname));
app.get("/find/:query", function (req, res) {
  var query = req.params.query;
  Model.find(
    {
      $text: {
        $search: query,
      },
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: "Error",
          })
        );
      }
    }
  );
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Node.js listening on port " + port);
});
