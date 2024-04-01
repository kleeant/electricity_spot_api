import dotenv from 'dotenv'
dotenv.config()

interface Config {
  NODE_ENV: string
  DB_HOST: string
  DB_PORT: string
  DB_USER: string
  DB_PASS: string
  DB_DATABASE: string
  API_PORT: number
}

const makeData = (): Config => {
  const data: any = {
    NODE_ENV: process.env.NODE_ENV,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DATABASE: process.env.DB_DATABASE,

    API_PORT: process.env.API_PORT === undefined ? null : parseInt(process.env.API_PORT)
  }

  for (const key of Object.keys(data)) {
    if (data[key] === undefined) {
      console.log(`${key} is missing from .env`)
    }
  }
  return data
}

export default makeData()
