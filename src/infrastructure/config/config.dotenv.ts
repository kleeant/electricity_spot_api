/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
/* eslint-disable  @typescript-eslint/prefer-nullish-coalescing */

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
  ENTSOE_API_TOKEN: string
  ENTSOE_API_URL: string
  ENTSOE_FIN_DOMAIN: string
  ELECTRICITY_TAX_FIN: number
  PRICE_ROUNDING_DECIMALS: number
  AXIOS_ENABLE_CURLS: boolean
}

const makeData = (): Config => {
  const data: any = {
    NODE_ENV: process.env.NODE_ENV,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DATABASE: process.env.DB_DATABASE,
    AXIOS_ENABLE_CURLS: process.env.AXIOS_ENABLE_CURLS === 'true',
    ENTSOE_API_TOKEN: process.env.ENTSOE_API_TOKEN,
    ENTSOE_API_URL: process.env.ENTSOE_API_URL || null,
    ENTSOE_FIN_DOMAIN: process.env.ENTSOE_FIN_DOMAIN || null,
    ELECTRICITY_TAX_FIN: Number(process.env.ELECTRICITY_TAX_FIN) || 24,
    PRICE_ROUNDING_DECIMALS: Number(process.env.PRICE_ROUNDING_DECIMALS) || 2,
    API_PORT: process.env.API_PORT === undefined ? null : parseInt(process.env.API_PORT)
  }

  for (const key of Object.keys(data)) {
    if (data[key] === null || data[key] === undefined || data[key] === '') {
      throw new Error(`${key} is missing from .env`)
    }
  }
  return data
}

export default makeData()
