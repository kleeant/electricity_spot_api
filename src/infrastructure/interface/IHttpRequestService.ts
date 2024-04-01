import { AxiosRequestConfig } from 'axios'

export interface IHttpRequestService {
  makeHttpRequest: <T>(opt: AxiosRequestConfig) => Promise<T>
}
