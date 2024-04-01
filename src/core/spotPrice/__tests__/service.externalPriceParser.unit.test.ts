import Decimal from 'decimal.js'
import serviceExternalPriceParser from '../service.externalPriceParser'
import { mockdata } from '../../../tests/helper'
import { TEntsoePrice } from '../../../lib/schema/entsoePrice.schema'

describe('service.externalPriceParser::unit', () => {
  const getEntsoePrice = (): TEntsoePrice => mockdata.getEntsoePrice([
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
