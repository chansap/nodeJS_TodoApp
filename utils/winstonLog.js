const winston = require('winston');
require('winston-mongodb')
const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({
        //     filename: 'combined.log',
        //   }),
        // new winston.transports.MongoDB({
        //   level: 'error',
        //   db: 'mongodb://127.0.0.1:27017/todo',
        //   "collection": "logs"
        // })
    ],
  });

  module.exports = logger