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
export interface TSpotPriceSummary { prices: TSpotPrice[], meta: TSpotPriceMeta }
export interface TSpotPrice { price_with_tax: Decimal, price: Decimal, timestamp: Date }
export type TSpotPriceMeta = components['schemas']['TSpotPriceMeta']
export type TApiError = components['schemas']['Error']
