import { Knex } from 'knex'
import util from '../../../lib/util'

export const up = async (knex: Knex): Promise<void> => {
  const { fileName, path } = util.file.parseFileName(__filename)
  return await knex.raw(util.file.readFile(path, `${fileName}-up.sql`))
}

export const down = async (knex: Knex): Promise<void> => {
  const { fileName, path } = util.file.parseFileName(__filename)
  return await knex.raw(util.file.readFile(path, `${fileName}-down.sql`))
}
