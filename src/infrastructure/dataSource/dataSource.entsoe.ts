import { TEntsoePrice } from '../../lib/schema/entsoePrice.schema'
import util from '../../lib/util'
import configDotenv from '../config/config.dotenv'
import { IDataSourceEntsoe } from '../interface/IDataSourceEntsoe'
import { IHttpRequestService } from '../interface/IHttpRequestService'
const { HttpRequestService } = util.http

export class DataSourceEntsoe implements IDataSourceEntsoe {
  private readonly httpService: IHttpRequestService
  constructor (httpService: IHttpRequestService = new HttpRequestService()) {
    this.httpService = httpService
  }

  public async getDayAheadPrices (start: Date, end: Date): Promise<TEntsoePrice> {
    const result = await this.httpService.makeHttpRequest({
      url: configDotenv.ENTSOE_API_URL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
        Accept: 'application/xml'
      },
      params: {
        documentType: 'A44',
        out_Domain: configDotenv.ENTSOE_FIN_DOMAIN,
        in_Domain: configDotenv.ENTSOE_FIN_DOMAIN,
        periodStart: util.date.getDateAsNumber(start),
        periodEnd: util.date.getDateAsNumber(end),
        securityToken: configDotenv.ENTSOE_API_TOKEN
      }
    })
    const data = util.xml.parseXml(result as string) as TEntsoePrice
    return data
  }
}
