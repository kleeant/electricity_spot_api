import Decimal from 'decimal.js'
import { TSpotPriceDbo, TCreateSpotPriceDbo } from '../../../lib/types/types'
import databaseConnection from '../database.connection'
class SpotPriceRepository {
  private readonly tableName = 'spot_price'
  async getSpotPrices (uuids?: string[]): Promise<TSpotPriceDbo[]> {
    const connection = databaseConnection.getConnection()
    const q = connection(this.tableName).select('*')
    if ((uuids != null) && uuids.length > 0) {
      void q.whereIn('uuid', uuids)
    }
    return await q
  }

  async getLatestTimeStamp (): Promise<TSpotPriceDbo | null> {
    const connection = databaseConnection.getConnection()
    const q = connection(this.tableName).select('timestamp').orderBy('timestamp', 'desc').limit(1)
    const res = await q
    return res[0] ?? null
  }

  async createSpotPrices (data: TCreateSpotPriceDbo[]): Promise<TSpotPriceDbo[]> {
    // decimal class does not play well with postgresql. Double quotes appear in the string
    const insertable = data.map((item) => ({ ...item, price: item.price.toString() }))
    const res = await databaseConnection.insert(this.tableName, insertable)
    return (res as Array<{ price: string }>).map(row => ({ ...row, price: new Decimal(row.price) })) as TSpotPriceDbo[]
  }
}
export default new SpotPriceRepository()
