import knex, { Knex } from 'knex'
import { knexConfig, defaultKnexCOnfig } from './knex/knex.config'
import configDotenv from '../config/config.dotenv'
import { createDatabaseQ, dropDatabaseQ, databaseExistsQ } from './queries/queries.system'
import loggerService from '../../lib/logger'

class DatabaseConnection {
  private connection?: Knex | null = null
  private defaultConnection?: Knex | null = null

  getConnection (): Knex {
    if (this.connection == null) {
      this.connection = knex(knexConfig)
    }
    return this.connection
  }

  getDefaultConnection (): Knex {
    if (this.defaultConnection == null) {
      this.defaultConnection = knex(defaultKnexCOnfig)
    }
    return this.defaultConnection
  }

  async closeConnection (): Promise<void> {
    (this.connection != null) && await this.connection.destroy()
    this.connection = null
  }

  async closeDefaultConnection (): Promise<void> {
    (this.defaultConnection != null) && await this.defaultConnection.destroy()
    this.defaultConnection = null
  }

  async closeAllConnections (): Promise<void> {
    await this.closeConnection()
    await this.closeDefaultConnection()
  }

  async resetDatabase (): Promise<void> {
    await this.dropDatabase()
    await this.createDatabase()
    await this.toLatestMigration()
  }

  async ensureLatestDatabase (): Promise<void> {
    const res = await this.runQuery(databaseExistsQ, { name: configDotenv.DB_DATABASE }, this.getDefaultConnection())
    if (res.length === 0) {
      loggerService.info(`Database does not exist, creating it with name of ${configDotenv.DB_DATABASE}`)
      await this.createDatabase()
    }
    await this.toLatestMigration()
  }

  async createDatabase (): Promise<void> {
    const defaultConnection = this.getDefaultConnection()
    await this.runQuery(createDatabaseQ, { name: configDotenv.DB_DATABASE }, defaultConnection)
  }

  async dropDatabase (): Promise<void> {
    const defaultConnection = this.getDefaultConnection()
    await this.runQuery(dropDatabaseQ, { name: configDotenv.DB_DATABASE }, defaultConnection)
    await this.closeConnection()
  }

  async toLatestMigration (): Promise<void> {
    const db = this.getConnection()
    await db.migrate.latest()
  }

  async runQuery (query: string, params: unknown[] | Object = [], db = this.getConnection()): Promise<any> {
    try {
      const result = await db.raw(query, params)
      return result.rows
    } catch (e) {
      // without this at least jest just prints an empty error without message or stacktrace
      loggerService.error(e as Error)
      throw e
    }
  }

  async insert <T>(table: string, data: any, db = this.getConnection()): Promise<T[]> {
    return await db(table).insert(data).returning('*')
  }
}
export default new DatabaseConnection()
