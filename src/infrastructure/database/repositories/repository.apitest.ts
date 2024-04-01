import { TCreateApiTestDbo, TApiTestDbo } from '../../../lib/types/types'
import databaseConnection from '../database.connection'
class ApiTestRepository {
  private readonly tableName = 'api_test'
  async getApiTest (uuids?: string[]): Promise<TApiTestDbo[]> {
    const connection = databaseConnection.getConnection()
    const q = connection(this.tableName).select('*')
    if (!(uuids == null) && uuids.length > 0) {
      void q.whereIn('uuid', uuids)
    }
    return await q
  }

  async createApiTest (data: TCreateApiTestDbo[]): Promise<TApiTestDbo[]> {
    const res = await databaseConnection.insert(this.tableName, data)
    return res as TApiTestDbo[]
  }
}
export default new ApiTestRepository()
