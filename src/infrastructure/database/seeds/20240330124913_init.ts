import { Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('api_test').del()

  // Inserts seed entries
  await knex('api_test').insert([
    { id: 1, colName: '6e908657-219c-4e96-87fe-dc29efa1c178' },
    { id: 2, colName: '9c9826e0-7e39-4f25-91bf-7772d16e5784' },
    { id: 3, colName: 'c02d8643-19f7-4e73-b518-8bfa00198a10' }
  ])
};
