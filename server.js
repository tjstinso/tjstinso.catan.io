var express = require('express');
var app = express();

app.use('/dist', express.static(__dirname + "/dist"));
app.use('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
})

app.listen(3000);
