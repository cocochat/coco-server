const winston = require("winston");

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
        json: false,
        colorize: true,
    },
};

let logger = new winston.Logger({
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