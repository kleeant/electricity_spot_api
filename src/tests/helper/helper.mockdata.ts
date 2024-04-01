import { TEntsoePeriod, TEntsoePrice, TEntsoeTimeInterval } from '../../lib/schema/entsoePrice.schema'

const createPeriod = (timeInterval: TEntsoeTimeInterval): TEntsoePeriod => ({
  resolution: 'PT60M',
  timeInterval,
  Point: Array(24)
    .fill({})
    .map((_, i) => ({ 'price.amount': 123.56, position: i + 1 }))
})

// get prices for two days
export const getEntsoePrice = (timeIntervals: TEntsoeTimeInterval[]): TEntsoePrice => {
  return {
    Publication_MarketDocument: {
      TimeSeries: timeIntervals.map(timeInterval => ({
        'currency_Unit.name': 'EUR',
        'price_Measure_Unit.name': 'MWH',
        'in_Domain.mRID': '10YFI-1--------U',
        'out_Domain.mRID': '10YFI-1--------U',
        Period: createPeriod(timeInterval)
      }))
    }
  }
}
