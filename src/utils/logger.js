// src/utils/logger.js
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	defaultMeta: { service: 'image-manager' },
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		}),
		new winston.transports.File({
			filename: path.join(logDir, 'error.log'),
			level: 'error'
		}),
		new winston.transports.File({
			filename: path.join(logDir, 'combined.log')
		})
	]
});

logger.logRequest = (req, res, next) => {
	logger.info(`${req.method} ${req.originalUrl}`, {
		ip: req.ip,
		body: req.body
	});
	next();
};

logger.logError = (error, req = null) => {
	logger.error(error.message, {
		stack: error.stack,
		url: req ? req.originalUrl : null,
		body: req ? req.body : null
	});
};

module.exports = logger;
