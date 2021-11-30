import winston from 'winston';
require('winston-mongodb');

const transports: any = winston.transports;

export const logConfiguration = {
  transports:[
  // File transport
    new transports.File(
      {
        filename: 'logs/server.log',
        format: winston.format.combine(
            winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            winston.format.align(),
            winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
          )
      }
    ),

// MongoDB transport
    new transports.MongoDB({
        level: 'error',
        //mongo database connection link
        db : 'mongodb://localhost:27017/logs',
        options: {
            useUnifiedTopology: true
        },
        // A collection to save json formatted logs
        collection: 'server_logs',
        format: winston.format.combine(
        winston.format.timestamp(),
        // Convert logs to a json format
        winston.format.json())
    })
  ]
};
