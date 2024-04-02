import Decimal from 'decimal.js'
import { EntsoePriceResultSchema, TEntsoePeriod, TEntsoePriceResult } from '../../lib/schema/entsoePrice.schema'
import { TCreateSpotPriceDbo } from '../../lib/types/types'
import util from '../../lib/util'
class ExternalPriceParserService {
  validateEntsoePrices (data: TEntsoePriceResult): void {
    util.schema.validate(data, EntsoePriceResultSchema)
  }

  /**
   * change price from €/MWh to c/kWh
   */
  formatPrice (price: number): Decimal {
    return new Decimal(price).dividedBy(10)
  }

  /**
   * @description - period is an array of items, each item has a price and a position
   * the array can have missing items, so we need to add hours based on position.
   */
  parseEntsoePeriod (data: TEntsoePeriod, id?: number): TCreateSpotPriceDbo[] {
    const result = data.Point.map((item, i) => {
      return {
        price: this.formatPrice(item['price.amount']),
        timestamp: item.position === 1 ? new Date(data.timeInterval.start) : util.date.addHours(item.position - 1, new Date(data.timeInterval.start))
      }
    })
    return result
  }

  parseSpotPrices (data: TEntsoePriceResult): TCreateSpotPriceDbo[] {
    this.validateEntsoePrices(data)
    const result = data.Publication_MarketDocument.TimeSeries.reduce<TCreateSpotPriceDbo[]>((acc, item) => {
      const period = this.parseEntsoePeriod(item.Period, (item as any).mRID as number)
      acc.push(...period)
      return acc
    }, [])

    return result
  }
}

export default new ExternalPriceParserService()
