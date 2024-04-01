import path from 'path'
import express, { type Express } from 'express'
// import helmet from 'helmet'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnauthorizedError } from 'express-jwt'
// import JwksRsa from 'jwks-rsa'
import * as OpenApiValidator from 'express-openapi-validator'
import * as swaggerUi from 'swagger-ui-express'
import yaml from 'yaml'
import { HttpError } from 'express-openapi-validator/dist/framework/types'
import ValidationError from '../../lib/error/error.validationError'
import configDotenv from '../../infrastructure/config/config.dotenv'
import loggerService from '../../lib/logger'
import util from '../../lib/util'
import { TApiError } from '../../lib/types/types'
/*
const jwtCheck = expressjwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${configDotenv.AUTH_DOMAIN}/.well-known/jwks.json`
  }) as GetVerificationKey,
  audience: configDotenv.AUTH_AUDIENCE,
  issuer: `https://${configDotenv.AUTH_DOMAIN}/`,
  algorithms: ['RS256']
}).unless({ path: '/favicon.ico' })
*/

/**
 * App Variables
 */

export default (): Express => {
  const app = express()
  const apiSpec = yaml.parse(util.file.readFile(__dirname, 'server.openapi.yaml'))
  /**
   *  App Configuration
   */

  /* helmet is interfering with swagger ui log in process.
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
      }
    }
  }))
  */
  // app.use(cors())
  app.use(express.raw({ limit: '50mb' }))
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))
  // parse various different custom JSON types as JSON
  if (configDotenv.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec, { explorer: true }))
  }

  // app.use(jwtCheck)

  const sep = path.sep
  const corePath = __dirname.replace(`${sep}infrastructure${sep}server`, `${sep}core`)
  app.use(
    OpenApiValidator.middleware({
      apiSpec,
      validateRequests: true,
      validateResponses: true,
      operationHandlers: corePath,
      /* validateSecurity: {
        handlers: {
          internal_jwt_auth: (req, scopes, schema) => {
            return true
          }
        }
      } */
      serDes: [
        OpenApiValidator.serdes.dateTime,
        OpenApiValidator.serdes.date
      ]
    })
  )
  // error handler
  app.use((error: any, req: any, res: any, next: any) => {
    let data: { status: number, messages: TApiError[] }
    // errors coming from openapivalidator. For example data validation errors
    if (error instanceof HttpError) {
      if (configDotenv.NODE_ENV === 'test') {
        loggerService.error(JSON.stringify(error.errors))
      }
      data = {
        status: error.status,
        messages: error.errors.map(e => ({ description: JSON.stringify(e) }))
      }
    } else if (error instanceof ValidationError) {
      data = {
        status: 400,
        messages: [{ description: error.message }]
      }
    } else if (error instanceof UnauthorizedError) {
      data = {
        status: error.status,
        messages: [{ description: error.message }]
      }
    } else {
      data = {
        status: 500,
        messages: [{ description: configDotenv.NODE_ENV !== 'production' ? `${error.message as string}: ${JSON.stringify(error.stack)}` : 'Internal Server Error' }]
      }
      loggerService.error(error)
    }
    res.status(data.status)
      .json(data.messages)
  })
  process.on('exit', () => {
    loggerService.info('Process exiting...')
  })
  return app
}
