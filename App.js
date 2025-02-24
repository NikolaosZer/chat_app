// Imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./db');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const initRoutes = require('./routes/initRoutes');


app.use(morgan('dev', {
	skip: function (req, res) { return res.statusCode > 400 }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.use((req, res, next) => {
	// Set response headers
	res.header('Access-Control-Allow-Origin', '*'); // Allow access to any (*) site
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // We set which kind of headers we want to accept

	// Set available request methods
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		return res.status(200).json({});
	}
	next(); // Go to next middleware
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use('/api/v1', initRoutes, userRoutes, messageRoutes);

app.use((req, res, next) => {
	const error = new Error('No route was found for this request!');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

sequelize.sync({ force: true }).then(() => {
	console.log('Database synced successfully');
});

module.exports = app;
