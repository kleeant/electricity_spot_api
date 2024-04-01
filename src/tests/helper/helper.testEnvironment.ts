import supertest from 'supertest'
import databaseConnection from '../../infrastructure/database/database.connection'
import serverExpress from '../../infrastructure/server/server.express'
import TestAgent from 'supertest/lib/agent'

class TestEnvironment {
  private api?: TestAgent

  async setupDatabaseForTestEnvironment (): Promise<void> {
    await databaseConnection.createDatabase()
    await databaseConnection.toLatestMigration()
  }

  async teardownDatabaseForTestEnvironment (): Promise<void> {
    await databaseConnection.dropDatabase()
    await databaseConnection.closeAllConnections()
  }

  getApi (): TestAgent {
    if (this.api == null) {
      this.api = supertest(serverExpress())
    }
    return this.api
  }

  async setupApiForTestEnvironment (): Promise<void> {
    await this.setupDatabaseForTestEnvironment()
  }

  async teardownApiForTestEnvironment (): Promise<void> {
    await this.teardownDatabaseForTestEnvironment()
  }
}

export default new TestEnvironment()
