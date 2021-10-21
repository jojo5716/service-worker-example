var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')

var certOptions = {
    key: fs.readFileSync(path.resolve('server.key')),
    cert: fs.readFileSync(path.resolve('server.crt'))
}

var app = express();
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

https.createServer(certOptions, app).listen(443)
