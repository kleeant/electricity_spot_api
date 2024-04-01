import repositoryApitest from '../../infrastructure/database/repositories/repository.apitest'
import { TApiTest, TCreateApiTest } from '../../lib/types/types'

export class SpotPriceService {
  private readonly repository: typeof repositoryApitest

  constructor (repository = repositoryApitest) {
    this.repository = repository
  }

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

  async postTest (data: TCreateApiTest[]): Promise<TApiTest[]> {
    const result = await this.repository.createApiTest(data)
    return result.map((item) => {
      return {
        uuid: item.uuid,
        name: item.name,
        description: item.description,
        created_at: item.created_at
      }
    })
  }
}
