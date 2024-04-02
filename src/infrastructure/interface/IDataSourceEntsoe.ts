import { TEntsoePriceResult } from '../../lib/schema/entsoePrice.schema'

export interface IDataSourceEntsoe {
  getDayAheadPrices: (from: Date, to: Date) => Promise<TEntsoePriceResult>
}
