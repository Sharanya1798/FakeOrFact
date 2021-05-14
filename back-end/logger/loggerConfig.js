const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: './fakeorfact.log'
        })
    ],
    format: winston.format.combine(

        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${[info.timestamp]}, ${info.level}, ${info.message}`),
    )
};
const logger = winston.createLogger(logConfiguration);
module.exports = logger;