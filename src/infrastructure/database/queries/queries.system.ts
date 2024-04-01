
export const dropDatabaseQ = 'DROP DATABASE IF EXISTS :name: with (force);'
export const createDatabaseQ = 'CREATE DATABASE :name:;'
export const databaseExistsQ = 'SELECT datname FROM pg_database WHERE datname = :name;'
