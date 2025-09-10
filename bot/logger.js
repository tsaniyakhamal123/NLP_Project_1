// bot/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Level log minimal yang akan dicatat
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DDTHH:mm:ssZ' 
    }),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    // Transport 1: Tampilkan semua log di terminal
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Warna untuk level log di console
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    }),
    // Transport 2: Simpan log dengan level 'error' ke dalam file `logs/error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Transport 3: Simpan semua log ke dalam file `logs/combined.log`
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;