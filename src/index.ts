import server from './infrastructure/server/server.express'
import config from './infrastructure/config/config.dotenv'
import databaseConnection from './infrastructure/database/database.connection'
import loggerService from './lib/logger'
const run = async (): Promise<void> => {
  await databaseConnection.ensureLatestDatabase()
  const app = server()
  app.listen(config.API_PORT, () => {
    loggerService.info(`API listening on port ${config.API_PORT}`)
    loggerService.info(`API docs at http://localhost:${config.API_PORT}/openapi/ui/`)
  })
}

void run()
