const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostname = 'localhost';
const port = 3000;

// app object conventionally denotes the Express app
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter); // mount dish router to overall app
app.use('/promos', promoRouter);
app.use('/leaders', leaderRouter);
app.use(express.static(__dirname+'/public'));

// Here we are creating a "middleware function" which has access to req, res, and next middleware
app.use((req, res, next) => {
	// next is used when you need to invoke additional middleware

	res.statusOcde = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// app.use() binds app level middlware to instance of app object
// app.use('path', () => {}) handles any type of HTTP request on the specified path

const server = http.createServer(app);
server.listen(port, hostname, () => {
	console.log(`Listening on ${hostname}:${port}`);
});