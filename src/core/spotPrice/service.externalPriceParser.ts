import Decimal from 'decimal.js'
import { EntsoePriceSchema, TEntsoePeriod, TEntsoePrice } from '../../lib/schema/entsoePrice.schema'
import { TCreateSpotPriceDbo } from '../../lib/types/types'
import util from '../../lib/util'
class ExternalPriceParserService {
  validateEntsoePrices (data: TEntsoePrice): void {
    util.schema.validate(data, EntsoePriceSchema)
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
  parseEntsoePeriod (data: TEntsoePeriod): TCreateSpotPriceDbo[] {
    // in hindsight I should have used date-fns, but in tests we trust
    const time = new Date(data.timeInterval.start).toISOString()
    const getDate = (hoursToAdd: number): Date => {
      const date = new Date(time)
      return new Date(date.setHours(date.getHours() + hoursToAdd))
    }
    const result = data.Point.map((item, i) => {
      return {
        price: this.formatPrice(item['price.amount']),
        timestamp: item.position === 1 ? new Date(time) : getDate(item.position - 1)
      }
    })
    return result
  }

  parseSpotPrices (data: TEntsoePrice): TCreateSpotPriceDbo[] {
    this.validateEntsoePrices(data)
    const result = data.Publication_MarketDocument.TimeSeries.reduce<TCreateSpotPriceDbo[]>((acc, item) => {
      const period = this.parseEntsoePeriod(item.Period)
      acc.push(...period)
      return acc
    }, [])

    return result
  }
}

export default new ExternalPriceParserService()
