import Decimal from 'decimal.js'
import serviceExternalPriceParser from '../service.externalPriceParser'
import { mockdata } from '../../../tests/helper'
import { TEntsoePeriod, TEntsoePriceResult } from '../../../lib/schema/entsoePrice.schema'

describe('service.externalPriceParser::unit', () => {
  const getEntsoePrice = (): TEntsoePriceResult => mockdata.getEntsoePrice([
    { start: '2024-02-24T23:00Z', end: '2024-02-25T23:00Z' }, { start: '2024-02-25T23:00Z', end: '2024-02-26T23:00Z' }
  ])

  describe('#formatPrice', () => {
    it('should format price correctly', () => {
      const europerMwh = 10
      const expected = new Decimal(1)
      const result = serviceExternalPriceParser.formatPrice(europerMwh)
      expect(result).toEqual(expected)

      const result2 = serviceExternalPriceParser.formatPrice(25.70)
      expect(result2).toEqual(new Decimal(2.57))
    })
  })

  describe('#parseEntsoePeriod', () => {
    it('should parse period correctly', () => {
      const data = getEntsoePrice().Publication_MarketDocument.TimeSeries[0].Period
      expect(data.timeInterval.start).toBe('2024-02-24T23:00Z')
      const result = serviceExternalPriceParser.parseEntsoePeriod(data)
      const price = new Decimal(12.356)
      expect(result.length).toBe(24)
      expect(result[0]).toEqual({ price, timestamp: new Date('2024-02-24T23:00Z') })
      expect(result[1]).toEqual({ price, timestamp: new Date('2024-02-25T00:00Z') })
      expect(result[2]).toEqual({ price, timestamp: new Date('2024-02-25T01:00Z') })
      expect(result[23]).toEqual({ price, timestamp: new Date('2024-02-25T22:00Z') })
    })
    it('should add hours based on position', () => {
      const data = getEntsoePrice().Publication_MarketDocument.TimeSeries[0].Period
      data.Point = [{ 'price.amount': 123.56, position: 1 }, { 'price.amount': 123.56, position: 5 }]
      const result = serviceExternalPriceParser.parseEntsoePeriod(data)
      expect(result[0].timestamp).toEqual(new Date('2024-02-24T23:00:00.000Z'))
      expect(result[1].timestamp).toEqual(new Date('2024-02-25T03:00:00.000Z'))
    })
    it('should not have duplicate times', () => {
      // regression test for a bug that was caused by date class...
      const data = {
        timeInterval: { start: '2024-03-30T23:00Z', end: '2024-03-31T22:00Z' },
        resolution: 'PT60M',
        Point: [
          { position: 1, 'price.amount': 42.09 },
          { position: 2, 'price.amount': 42.02 },
          { position: 3, 'price.amount': 42.1 },
          { position: 4, 'price.amount': 43.82 },
          { position: 5, 'price.amount': 46.19 },
          { position: 6, 'price.amount': 44.57 },
          { position: 7, 'price.amount': 48.92 },
          { position: 8, 'price.amount': 50.04 },
          { position: 9, 'price.amount': 49.31 },
          { position: 10, 'price.amount': 42.04 },
          { position: 11, 'price.amount': 35.37 },
          { position: 12, 'price.amount': 35.46 },
          { position: 13, 'price.amount': 33.1 },
          { position: 14, 'price.amount': 30.68 },
          { position: 15, 'price.amount': 32.6 },
          { position: 16, 'price.amount': 41.07 },
          { position: 17, 'price.amount': 52.66 },
          { position: 18, 'price.amount': 57.62 },
          { position: 19, 'price.amount': 58.05 },
          { position: 20, 'price.amount': 50.83 },
          { position: 21, 'price.amount': 50.09 },
          { position: 22, 'price.amount': 46.28 },
          { position: 23, 'price.amount': 43.98 }
        ]
      }
      const result = serviceExternalPriceParser.parseEntsoePeriod(data as TEntsoePeriod, 1)
      const times = result.map(r => r.timestamp.getTime())
      const duplicates = times.filter((item, index) => times.indexOf(item) !== index)
      expect(duplicates.length).toBe(0)
    })
  })

  describe('#validateEntsoePrices', () => {
    it('should accept valid data', () => {
      const data = getEntsoePrice()
      expect(() => serviceExternalPriceParser.validateEntsoePrices(data)).not.toThrow()
    })
    it('should throw if the resolution is not PT60M', () => {
      const data = getEntsoePrice()
      data.Publication_MarketDocument.TimeSeries[0].Period.resolution = 'PT30M' as 'PT60M'
      expect(() => serviceExternalPriceParser.validateEntsoePrices(data)).toThrow(/Expected 'PT60M/)
    })
    it('should throw if the currency_Unit.name is not EUR', () => {
      const data = getEntsoePrice()
      data.Publication_MarketDocument.TimeSeries[0]['currency_Unit.name'] = 'USD' as 'EUR'
      expect(() => serviceExternalPriceParser.validateEntsoePrices(data)).toThrow(/Expected 'EUR'/)
    })
    it('should throw if the price_Measure_Unit.name is not MWH', () => {
      const data = getEntsoePrice()
      data.Publication_MarketDocument.TimeSeries[0]['price_Measure_Unit.name'] = 'kWh' as 'MWH'
      expect(() => serviceExternalPriceParser.validateEntsoePrices(data)).toThrow(/Expected 'MWH'/)
    })
  })

  describe('#parseSpotPrices', () => {
    it('should parse spot prices correctly', () => {
      const data = getEntsoePrice()
      const result = serviceExternalPriceParser.parseSpotPrices(data)
      expect(result.length).toBe(48)
      const price = new Decimal(12.356)
      for (const item of result) {
        expect(item.price).toEqual(price)
        expect(item.timestamp).toBeInstanceOf(Date)
      }
    })
  })
})
