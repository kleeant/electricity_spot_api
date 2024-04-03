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

/**
 * required for creating new schemas.
 * postgre creates a default database with the same name as the user
 * if the definition is not given here something removes the password from the connection object when trying to copy it.
 * It is protected in some way.
 */
export const defaultKnexCOnfig: Knex.Config = {
  client: 'pg',
  pool: { min: 3, max: 10, acquireTimeoutMillis: 100 },
  asyncStackTraces: true,
  connection: {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    port: Number(config.DB_PORT),
    multipleStatements: true,
    database: config.DB_USER
  },
  log: { enableColors: false },
  migrations,
  seeds
}

export const knexConfig: Knex.Config = {
  client: 'pg',
  pool: { min: 3, max: 10, acquireTimeoutMillis: 100 },
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
