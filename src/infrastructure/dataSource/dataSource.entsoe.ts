import { TEntsoePriceResult } from '../../lib/schema/entsoePrice.schema'
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

  // periods require minutes to always be 00. Othervice the request is not accepted
  // 2024-02-24T23:25Z -> 202402242300
  getPeriod (date: Date): Number {
    const parts = date.toISOString().split('T')
    const yearMonthDay = parts[0].replaceAll('-', '')
    const [hours] = parts[1].split(':')
    const res = Number(`${yearMonthDay}${hours}00`)
    return res
  }

  public async getDayAheadPrices (start: Date, end: Date): Promise<TEntsoePriceResult> {
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
        periodStart: this.getPeriod(start),
        periodEnd: this.getPeriod(end),
        securityToken: configDotenv.ENTSOE_API_TOKEN
      }
    })
    const data = util.xml.parseXml(result as string) as TEntsoePriceResult
    return data
  }
}
