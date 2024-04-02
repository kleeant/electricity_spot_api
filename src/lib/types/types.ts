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
export type TSpotPriceSummary = components['schemas']['TSpotPriceSummary']
export type TSpotPrice = components['schemas']['TSpotPrice']
export type TSpotPriceSummaryMeta = components['schemas']['TSpotPriceSummaryMeta']
export type TApiError = components['schemas']['Error']
