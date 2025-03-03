import fs from "fs";
import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";

// Ensure logs directory exists
const logDirectory = path.resolve("logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const customFormat = winston.format.printf(({ message, timestamp }) => {
  return JSON.stringify({ message, timestamp });
});

// Configure Winston logger with daily rotate file
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 400;
  if (statusCode == 400)
    logger.error({
      message: err.message,
      timestamp: new Date().toISOString(),
    });

  res.status(statusCode).json({ status: statusCode, message: err.message });
};

export default errorHandler;
