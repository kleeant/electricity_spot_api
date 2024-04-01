import repositoryApitest from '../../infrastructure/database/repositories/repository.spotPrice'
import { DataSourceEntsoe } from '../../infrastructure/dataSource/dataSource.entsoe'
import { IDataSourceEntsoe } from '../../infrastructure/interface/IDataSourceEntsoe'
export class SpotPriceService {
  private readonly repository: typeof repositoryApitest
  private readonly dataSource: IDataSourceEntsoe
  constructor (repository = repositoryApitest, dataSource = new DataSourceEntsoe()) {
    this.repository = repository
    this.dataSource = dataSource
  }
/*
  async getTest (uuids?: string[]): Promise<TApiTest[]> {
    const result = await this.repository.getApiTest(uuids)
    return result.map((item) => {
      return {
        uuid: item.uuid,
        name: item.name,
        description: item.description,
        created_at: item.created_at
      }
    })
  }

  async updatePrices (): Promise<void> {
    //TODO check if db has any data
    const now = new Date()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // now in milliseconds minus 7 days
    const externalResult = await this.dataSource.getDayAheadPrices(sevenDaysAgo, now)
  } */
}
