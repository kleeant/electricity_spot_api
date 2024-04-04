import config from '../config/config.dotenv'
import type { Knex } from 'knex'
import path from 'path'

const migrations: Knex.MigratorConfig = {
  directory: path.join(__dirname, 'migrations'),
  stub: path.join(__dirname, 'knex.migrationStub.ts'),
  extension: 'ts'
}

const seeds: Knex.SeederConfig = {
  directory: path.join(__dirname, 'seeds'),
  extension: 'ts',
  timestampFilenamePrefix: true
}

export const knexConfig: Knex.Config = {
  client: 'pg',
  pool: { min: config.DB_MIN_CONNECTIONS, max: config.DB_MAX_CONNECTIONS, acquireTimeoutMillis: 100 },
  asyncStackTraces: true,
  connection: {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    port: Number(config.DB_PORT),
    multipleStatements: true,
    database: config.DB_DATABASE
  },
  log: { enableColors: true },
  migrations,
  seeds
}
