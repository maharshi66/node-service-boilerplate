import winston from 'winston';

// Function to create a custom format for console logs
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a console transport with colorization
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // Colorize console output for all log levels
   winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
  winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
});

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Set the log level for the logger (debug, info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [consoleTransport], // Output logs to the console with colorization
});

export default logger;

//TODO: Production logger and other transports like file or database for errors/activity in the app