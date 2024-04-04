import knex, { Knex } from 'knex'
import { knexConfig } from './knex.config'
import configDotenv from '../config/config.dotenv'
import { createDatabaseQ, dropDatabaseQ, databaseExistsQ } from './queries/queries.system'
import loggerService from '../../lib/logger'

class DatabaseConnection {
  private readonly pool: Map<string, Knex> = new Map()

  getConnectionFromPool (database: string): Knex {
    if (!this.pool.has(database)) {
      this.pool.set(database, knex({ ...knexConfig, connection: { ...(knexConfig.connection as Knex.ConnectionConfig), database } }))
    }
    return this.pool.get(database) as Knex
  }

  async closeConnection (database: string): Promise<void> {
    const conn = this.pool.get(database)
    if (conn !== null && conn !== undefined) {
      await conn.destroy()
      this.pool.delete(database)
    }
  }

  async closeAllConnections (): Promise<void> {
    for (const conn of this.pool.values()) {
      await this.closeConnection(conn.client.config.connection.database as string)
    }
  }

  getConnection (): Knex {
    return this.getConnectionFromPool(configDotenv.DB_DATABASE)
  }

  /**
   * required for creating new schemas.
   * postgre creates a default database with the same name as the user
   * but this can be overwritten in dotenv
   */
  getDefaultConnection (): Knex {
    return this.getConnectionFromPool(configDotenv.DB_DEFAULT_DATABASE)
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
    await this.closeConnection(configDotenv.DB_DATABASE)
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
