import * as fs from "fs"
import path from "path"
import winston, { createLogger, format, transports } from "winston"
import { Response, Request, NextFunction } from "express"
import { ApiError, ErrorType, InternalError } from "../core/apiError"
import { environment } from "../config"
import DailyRotateFile from "winston-daily-rotate-file"
import { sanitizeData } from "../helpers/sanitizeData"

let dir = path.resolve("logs")

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
const options = {}

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "info"

const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  // @ts-ignore
  filename: dir + "/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
    format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message} `
    )
  ),
})

const Logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        format.errors({ stack: true }),
        format.colorize({ all: true })
      ),
    }),
    dailyRotateFile,
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false, // do not exit on handled exceptions
})

const loggerAllRequests = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date().getTime()

  res.on("finish", () => {
    const elapsedTime = new Date().getTime() - startTime
    Logger.warn(
      ` ${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${elapsedTime}ms`,
      {
        requestBody: sanitizeData(req.body),
        queryParameters: req.query,
      }
    )
  })
  next()
}

const ErrorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res)
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      )
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    )
    Logger.error(err)
    if (environment === "development") {
      return res.status(500).send(err)
    }
    ApiError.handle(new InternalError(), res)
  }
  next()
}

export { Logger, ErrorLogger, loggerAllRequests }
