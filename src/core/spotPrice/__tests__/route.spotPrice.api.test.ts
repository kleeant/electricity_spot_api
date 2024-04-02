/* eslint-disable  @typescript-eslint/naming-convention */

import { testEnvironment, testConstants, mockdata } from '../../../tests/helper'
import { SpotPriceService } from '../service.spotPrice'
import { IDataSourceEntsoe } from '../../../infrastructure/interface/IDataSourceEntsoe'
import configDotenv from '../../../infrastructure/config/config.dotenv'
describe('route.spotPrice::api', () => {
  beforeAll(async () => {
    await testEnvironment.setupApiForTestEnvironment()
    const mockEntsoeData = mockdata.getEntsoePrice([
      { start: '2024-02-24T23:00Z', end: '2024-02-25T23:00Z' },
      { start: '2024-02-25T23:00Z', end: '2024-02-26T23:00Z' },
      { start: '2024-02-26T23:00Z', end: '2024-02-27T23:00Z' }
    ])
    const entsoeMock: IDataSourceEntsoe = {
      getDayAheadPrices: async (from, to) => {
        return mockEntsoeData
      }
    }
    await (new SpotPriceService(entsoeMock)).updatePrices()
  })

  afterAll(async () => {
    await testEnvironment.teardownApiForTestEnvironment()
  })

  describe('GET /spot_price', () => {
    const date_from = '2024-02-24T23:00:00.000Z'
    const date_to = '2024-02-26T23:00:00.000Z'
    it('GET /spot_price should return 200', async () => {
      const result = await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_from, date_to })
        .expect(200)
      expect(result.body.data.from).toBe(date_from)
      expect(result.body.data.to).toBe(date_to)
      expect(result.body.data.meta).toEqual({
        price_unit: 'c/kWh',
        tax: configDotenv.ELECTRICITY_TAX_FIN
      })
      expect(result.body.data.prices.length).not.toBe(0)
    })
    it('GET /spot_price should return 400 if date_from is missing', async () => {
      await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_to })
        .expect(400)
    })
    it('GET /spot_price should return 400 if date_to is missing', async () => {
      await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_from })
        .expect(400)
    })
  })
})
