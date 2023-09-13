const winston = require('winston');
const winstonExpress = require('express-winston')
const { combine, timestamp, printf, colorize, align } = winston.format;

const loggermiddleware = winstonExpress.logger({
    level : 'info',
    transports: [
      new winston.transports.Console(),
    ],
    format: combine(
              colorize({ all: true }),
              timestamp({
                format: 'YYYY-MM-DD hh:mm:ss.SSS A',
              }),
              align(),
              printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    statusLevels : true 
})

module.exports = loggermiddleware