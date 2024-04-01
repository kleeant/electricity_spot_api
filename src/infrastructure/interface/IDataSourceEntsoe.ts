import { TEntsoePrice } from '../../lib/schema/entsoePrice.schema'

export interface IDataSourceEntsoe {
  getDayAheadPrices: (from: Date, to: Date) => Promise<TEntsoePrice>
}
