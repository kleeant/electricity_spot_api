import Decimal from 'decimal.js'
import { TSpotPriceDbo, TCreateSpotPriceDbo } from '../../../lib/types/types'
import databaseConnection from '../database.connection'
import { getSpotPrices } from '../queries/queries.spotPrice'
class SpotPriceRepository {
  private readonly tableName = 'spot_price'

  async getLatestTimeStamp (): Promise<TSpotPriceDbo | null> {
    const connection = databaseConnection.getConnection()
    const q = connection(this.tableName).select('timestamp').orderBy('timestamp', 'desc').limit(1)
    const res = await q
    return res[0] ?? null
  }

  async getSpotPrices (from: Date, to: Date): Promise<TSpotPriceDbo[]> {
    const result = await databaseConnection.runQuery(getSpotPrices, { from, to })
    return (result as Array<{ price: string }>).map(row => ({ ...row, price: new Decimal(row.price) })) as TSpotPriceDbo[] // TODO move decimal cast to db driver layer
  }

  async createSpotPrices (data: TCreateSpotPriceDbo[]): Promise<TSpotPriceDbo[]> {
    // decimal class does not play well with postgresql. Double quotes appear in the string
    const insertable = data.map((item) => ({ ...item, price: item.price.toString() }))
    const res = await databaseConnection.insert(this.tableName, insertable)
    return (res as Array<{ price: string }>).map(row => ({ ...row, price: new Decimal(row.price) })) as TSpotPriceDbo[]
  }
}
export default new SpotPriceRepository()
