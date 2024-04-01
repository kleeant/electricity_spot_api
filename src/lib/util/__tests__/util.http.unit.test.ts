import axios from 'axios'
import ExternalServiceError from '../../error/error.externalService'
import loggerService from '../../logger'
import { HttpRequestService } from '../util.http'

describe('util.http::unit', () => {
  describe('#makeHttpRequest', () => {
    it('should throw ExternalServiceError if error is an axiosError and response is defined', async () => {
      const axiosMock = jest.fn().mockRejectedValue({ isAxiosError: true, response: {} }) as unknown as typeof axios
      const loggerMock = { info: jest.fn() } as unknown as typeof loggerService
      const httpService = new HttpRequestService(loggerMock, axiosMock)
      await expect(httpService.makeHttpRequest({ url: 'test' })).rejects.toThrow(ExternalServiceError)
    })
    it('should throw ExternalServiceError if error is an axiosError and request is defined', async () => {
      const axiosMock = jest.fn().mockRejectedValue({ isAxiosError: true, request: {} }) as unknown as typeof axios
      const loggerMock = { info: jest.fn() } as unknown as typeof loggerService
      const httpService = new HttpRequestService(loggerMock, axiosMock)
      await expect(httpService.makeHttpRequest({ url: 'test' })).rejects.toThrow(ExternalServiceError)
    })
    it('should pass the axios error forward if request and response are undefined.', async () => {
      const err = new Error('derp')
      const axiosMock = jest.fn().mockRejectedValue(err) as unknown as typeof axios
      const loggerMock = { info: jest.fn() } as unknown as typeof loggerService
      const httpService = new HttpRequestService(loggerMock, axiosMock)
      await expect(httpService.makeHttpRequest({ url: 'test' })).rejects.toThrow(err)
    })
  })
})
