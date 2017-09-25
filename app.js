//server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer();
const PORT = 3000;

//other
const morgan = require('morgan');
const logger = morgan('dev');
const nunjucks = require('nunjucks');

//routes
const routes = require('./routes');

//forms
const bodyParser = require('body-parser');

//database
const { Client } = require('pg');
const client = new Client();
client.connect();

//middleware
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static('public'));
app.use(routes);
app.use(function (req, res, next) {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next();
});

//layout
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.listen(3000, function() {
    console.log('Ready');
})