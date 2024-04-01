import db from '../database.connection'
import config from '../../config/config.dotenv'

describe('database.connection::int', () => {
  beforeAll(async () => {
    await db.dropDatabase()
  })
  afterAll(async () => {
    await db.dropDatabase()
    await db.closeAllConnections()
  })
  describe('#getConnection', () => {
    it('should return a connection', () => {
      const connection = db.getConnection()
      expect(connection).toBeDefined()
    })
  })
  describe('create & drop database', () => {
    it('should create a database', async () => {
      await db.createDatabase()
      const res = await db.getConnection().raw('SELECT datname FROM pg_database WHERE datname = ?', [config.DB_DATABASE])
      expect(res.rows[0].datname).toBe(config.DB_DATABASE)
    })
    it('should drop a database', async () => {
      await db.dropDatabase()
      const res = await db.getDefaultConnection().raw('SELECT datname FROM pg_database WHERE datname = ?', [config.DB_DATABASE])
      expect(res.rows.length).toBe(0)
    })
  })
  describe('#ensureLatestDatabase', () => {
    beforeEach(async () => {
      await db.dropDatabase()
    })
    it('should create a database if it does not exist', async () => {
      await db.ensureLatestDatabase()
      const res = await db.getConnection().raw('SELECT datname FROM pg_database WHERE datname = ?', [config.DB_DATABASE])
      expect(res.rows[0].datname).toBe(config.DB_DATABASE)
    })
    it('should not create a database if it exists', async () => {
      await db.ensureLatestDatabase()
      const spy = jest.spyOn(db, 'createDatabase')
      await db.ensureLatestDatabase()
      expect(spy).not.toHaveBeenCalled()
    })
  })
  describe('rest of the methods', () => {
    beforeAll(async () => {
      await db.dropDatabase()
      await db.createDatabase()
    })
    describe('migrations', () => {
      describe('#toLatestMigration', () => {
        it('should run migrations', async () => {
          await db.toLatestMigration()
          const res = await db.getConnection().raw('SELECT * FROM knex_migrations')
          expect(res.rows.length).toBeGreaterThan(0)
        })
      })
    })
    describe('#runQuery', () => {
      it('should run a query', async () => {
        const res = await db.runQuery('SELECT 1 + 1 as works')
        expect(res[0].works).toBe(2)
      })
      it('should run a query with array params', async () => {
        const res = await db.runQuery('SELECT ? as works', [1])
        expect(res[0].works).toBe('1')
      })
      it('should run a query with object params', async () => {
        const res = await db.runQuery('SELECT :a as works', { a: 1 })
        expect(res[0].works).toBe('1')
      })
    })
  })
})
