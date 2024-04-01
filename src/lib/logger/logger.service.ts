import winston from 'winston'
const { combine, errors, colorize, timestamp, prettyPrint } = winston.format
class Logger {
  private readonly logger: winston.Logger
  constructor () {
    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        errors({ stack: true }), // <-- use errors format
        colorize(),
        timestamp(),
        prettyPrint()
      ),
      defaultMeta: { service: 'api-service' },
      transports: [
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    })
  }

  info (message: string, ...props: any): void {
    this.logger.info(message, ...props)
  }

  error (message: string | Error | any[]): void {
    this.logger.error(message)
  }

  warn (message: string, ...props: any): void {
    this.logger.warn(message, ...props)
  }

  debug (message: string, ...props: any): void {
    this.logger.debug(message, ...props)
  }
}

export default new Logger()
