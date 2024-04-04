import Decimal from 'decimal.js'
import configDotenv from '../../infrastructure/config/config.dotenv'
import repositorySpotPrice from '../../infrastructure/database/repositories/repository.spotPrice'
import { DataSourceEntsoe } from '../../infrastructure/dataSource/dataSource.entsoe'
import { IDataSourceEntsoe } from '../../infrastructure/interface/IDataSourceEntsoe'
import loggerService from '../../lib/logger'
import { TSpotPriceSummary } from '../../lib/types/types'
import util from '../../lib/util'
import serviceExternalPriceParser from './service.externalPriceParser'
export class SpotPriceService {
  private readonly repository: typeof repositorySpotPrice
  private readonly dataSource: IDataSourceEntsoe
  private readonly serviceExternalPriceParser: typeof serviceExternalPriceParser
  constructor (
    dataSource: IDataSourceEntsoe = new DataSourceEntsoe(),
    repository = repositorySpotPrice,
    ExternalPriceParser = serviceExternalPriceParser
  ) {
    this.repository = repository
    this.dataSource = dataSource
    this.serviceExternalPriceParser = ExternalPriceParser
  }

  async updatePrices (): Promise<void> {
    const latestTimestampInDb = await this.repository.getLatestTimeStamp()
    const dbHasData = latestTimestampInDb !== null
    const latestTimestamp = dbHasData
      ? latestTimestampInDb.timestamp
      : util.date.removeDays(7, new Date())
    const tomorrow = util.date.addDays(1, new Date())

    if (util.date.firstDateIsNewer(latestTimestamp, tomorrow)) {
      loggerService.info(`No new data available from ENTSOE API. Latest timestamp in DB: [${latestTimestamp.toISOString()}], timestamp for tomorrow: [${tomorrow.toISOString()}]`)
      return
    }

    const externalResult = await this.dataSource.getDayAheadPrices(latestTimestamp, tomorrow)
    const parsedPrices = this.serviceExternalPriceParser.parseSpotPrices(externalResult)
    const pricesToSave = dbHasData
      ? parsedPrices.filter(price => util.date.firstDateIsNewer(price.timestamp, latestTimestampInDb.timestamp))
      : parsedPrices

    if (pricesToSave.length > 0) {
      await this.repository.createSpotPrices(pricesToSave)
      loggerService.info(`Saved ${pricesToSave.length} new spot prices`)
    }
  }

  async getSpotPriceSummary (from: Date, to: Date): Promise<TSpotPriceSummary> {
    const prices = await this.repository.getSpotPrices(from, to)
    const highestAndLowest = await this.repository.getHighestAndLowestPriceInRange(from, to)

    return {
      from: from.toISOString(),
      to: to.toISOString(),
      meta: {
        price_unit: 'c/kWh',
        tax: configDotenv.ELECTRICITY_TAX_FIN,
        highest_price_in_request_range: highestAndLowest.highest_price_in_range.toFixed(configDotenv.PRICE_ROUNDING_DECIMALS).toString(),
        lowest_price_in_request_range: highestAndLowest.lowest_price_in_range.toFixed(configDotenv.PRICE_ROUNDING_DECIMALS).toString()
      },
      prices: prices.map(({ price, timestamp }) => ({
        timestamp: timestamp.toISOString(),
        price: price.toFixed(configDotenv.PRICE_ROUNDING_DECIMALS).toString(),
        price_with_tax: price.mul(new Decimal(`1.${configDotenv.ELECTRICITY_TAX_FIN}`)).toFixed(configDotenv.PRICE_ROUNDING_DECIMALS).toString()
      }))
    }
  }
}
