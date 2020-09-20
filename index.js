const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

// app object conventionally denotes the Express app
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next(); // will continue to look for functions that match '/dishes/ endpoint
});

app.get('/dishes', (req, res, next) => {
	// now res is modified
	res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
	// post requests carry some info in body
	console.log(res.body);
	res.end('Will add info to dish: ' + req.body.name
	+ " with details: " + req.body.description); // expect a "name" field in JSON 
});

app.put('/dishes', (req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on /dishes');
})

app.delete('/dishes', (req, res, next) => {
	// later we will restrict this dangerous operation to authorized users
	res.statusCode = 403;
	res.end('DELETE operation not supported on /dishes');
})


app.get('/dishes/:dishId', (req, res, next) => {
	// now res is modified
	res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
	// post requests carry some info in body
	res.statusCode = 403;
	res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
	res.write('Updating the dish: ' + req.params.dishId + '\n');
	res.end(`Will udpate the dish: ${req.body.name} with details: ${req.body.description}`);
})

app.delete('/dishes/:dishId', (req, res, next) => {
	// later we will restrict this dangerous operation to authorized users
	res.statusCode = 403;
	res.end(`Deleting dish ${req.params.dishId}`);
})

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