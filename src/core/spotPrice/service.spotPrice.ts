import repositoryApitest from '../../infrastructure/database/repositories/repository.spotPrice'
import { DataSourceEntsoe } from '../../infrastructure/dataSource/dataSource.entsoe'
import { IDataSourceEntsoe } from '../../infrastructure/interface/IDataSourceEntsoe'
import serviceExternalPriceParser from './service.externalPriceParser'
export class SpotPriceService {
  private readonly repository: typeof repositoryApitest
  private readonly dataSource: IDataSourceEntsoe
  private readonly serviceExternalPriceParser: typeof serviceExternalPriceParser
  constructor (repository = repositoryApitest, dataSource = new DataSourceEntsoe(), ExternalPriceParser = serviceExternalPriceParser) {
    this.repository = repository
    this.dataSource = dataSource
    this.serviceExternalPriceParser = ExternalPriceParser
  }

  async updatePrices (): Promise<void> {
    // TODO check if db has any data
    const now = new Date()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // now in milliseconds minus 7 days
    const externalResult = await this.dataSource.getDayAheadPrices(sevenDaysAgo, now)
    this.serviceExternalPriceParser.parseSpotPrices(externalResult)
  }
}
