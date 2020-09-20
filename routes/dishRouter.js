const express = require('express');
const bodyParser = require('body-parser');

// API restpoint handling for /dishes
const dishRouter = express.Router();

dishRouter.use(bodyParser.json())

// route takes endpoint as parameter
dishRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next(); // will continue to look for functions that match '/dishes/ endpoint
})
.get((req, res, next) => {
	// now res is modified
	res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
	// post requests carry some info in body
	res.end('Will add info to dish: ' + req.body.name
	+ " with details: " + req.body.description); // expect a "name" field in JSON 
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
	// later we will restrict this dangerous operation to authorized users
	res.statusCode = 403;
	res.end('DELETE operation not supported on /dishes');
})

module.exports = dishRouter;


// app.get('/dishes/:dishId', (req, res, next) => {
// 	// now res is modified
// 	res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
// });

// app.post('/dishes/:dishId', (req, res, next) => {
// 	// post requests carry some info in body
// 	res.statusCode = 403;
// 	res.end('POST operation not supported on /dishes/' + req.params.dishId);
// });

// app.put('/dishes/:dishId', (req, res, next) => {
// 	res.write('Updating the dish: ' + req.params.dishId + '\n');
// 	res.end(`Will udpate the dish: ${req.body.name} with details: ${req.body.description}`);
// })

// app.delete('/dishes/:dishId', (req, res, next) => {
// 	// later we will restrict this dangerous operation to authorized users
// 	res.statusCode = 403;
// 	res.end(`Deleting dish ${req.params.dishId}`);
// })