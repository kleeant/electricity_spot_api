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

  async createSpotPrices (data: TCreateSpotPriceDbo[]): Promise<TSpotPriceDbo[]> {
    const insertable = data.map((item) => ({ ...item, price: item.price.toString() }))
    const res = await databaseConnection.insert(this.tableName, insertable)
    return (res as Array<{ price: string }>).map(row => ({ ...row, price: new Decimal(row.price) })) as TSpotPriceDbo[]
  }
}
export default new SpotPriceRepository()
