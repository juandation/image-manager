require('module-alias/register');
const express = require('express');
const path = require('path');
const session = require('express-session');
const imageRoutes = require('./routes/imageRoutes');
const logger = require('./utils/logger');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'image-manager',
		resave: false,
		saveUninitialized: true
	})
);

app.use((req, res, next) => {
	res.locals.message = req.session.message;
	delete req.session.message;
	next();
});

app.use('/', imageRoutes);

app.use((err, req, res, next) => {
	logger.logError(err, req);
	res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
	logger.info(`Server running at http://localhost:${PORT}`);
});
