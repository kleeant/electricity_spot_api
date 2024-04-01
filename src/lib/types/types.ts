import { components } from './generated'
import Decimal from 'decimal.js'

export interface TCreateSpotPriceDbo {
  price: Decimal
  timestamp: Date
}
export interface TSpotPriceDbo {
  id: number
  price: Decimal
  timestamp: Date
}
export type TCreateApiTest = components['schemas']['TCreateApiTest']
export type TCreateApiTestDbo = components['schemas']['TCreateApiTest']
export type TApiError = components['schemas']['Error']
