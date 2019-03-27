const winston = require("winston");
const appRoot = require("app-root-path");

let options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

let logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: true
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};

logger.record = (err, req = null) => {
    let reqErrString = "";
    if (req) {
        reqErrString = `- ${req.originalUrl} - ${req.method} - ${req.ip}`;
    }
    logger.error(`${err.status || 500} - ${err.message} ${reqErrString}`);
};

module.exports = logger;