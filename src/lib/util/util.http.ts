/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
import axios, { AxiosRequestConfig } from 'axios'
import curlirize from 'axios-curlirize'
import loggerService from '../logger'
import configDotenv from '../../infrastructure/config/config.dotenv'
import { DebugTimer } from './util.debugTimer'
import ExternalServiceError from '../error/error.externalService'
import { IHttpRequestService } from '../../infrastructure/interface/IHttpRequestService'

export class HttpRequestService implements IHttpRequestService {
  private readonly logger: typeof loggerService
  private readonly axios: typeof axios
  constructor (logger = loggerService, axiosService = axios) {
    configDotenv.AXIOS_ENABLE_CURLS && curlirize(axios, (result, err) => {
      const { command } = result
      const msg = `curl command: 
      ${command}`
      if (err) {
        loggerService.error(msg)
      } else {
        loggerService.info(msg)
      }
    })
    this.logger = logger
    this.axios = axiosService
  }

  async makeHttpRequest<T>(opt: AxiosRequestConfig): Promise<T> {
    const timer = new DebugTimer()
    try {
      const res = await this.axios(opt)
      return res.data
    } catch (e: any) {
      if (e.isAxiosError) {
        if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
          const { data, status, headers } = e.response
          this.logger.info('http request failed with other than 2xx', { data, status, headers })
        } else if (e.request) {
        // The request was made but no response was received
        // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
          this.logger.info('http request was made but no response was received', e.request)
        } else {
        // Something happened in setting up the request that triggered an e
          throw e
        }
        throw new ExternalServiceError(`External server [${opt.url as string}] responded with status: [${e.response?.status as string}]`)
      }
      throw e
    } finally {
      this.logger.info(`HTTP req ${opt.url as string} took ${timer.report()} ms`)
    }
  }
}
