import loggerService from '../logger.service'
// TODO find a better way to test logger
describe('Logger.service::unit', () => {
  describe('#info', () => {
    it('should log info', () => {
      const spy = jest.spyOn(loggerService, 'info')
      loggerService.info('info message', { some: 'data' })
      expect(spy).toHaveBeenCalledWith('info message', { some: 'data' })
    })
  })
  describe('#error', () => {
    it('should log error class', () => {
      const spy = jest.spyOn(loggerService, 'error')
      const e = new Error('error message')
      loggerService.error(e)
      expect(spy).toHaveBeenCalledWith(e)
    })
    it('should log error string', () => {
      const spy = jest.spyOn(loggerService, 'error')
      loggerService.error('error message')
      expect(spy).toHaveBeenCalledWith('error message')
    })
  })
  describe('#warn', () => {
    it('should log warn', () => {
      const spy = jest.spyOn(loggerService, 'warn')
      loggerService.warn('warn message')
      expect(spy).toHaveBeenCalledWith('warn message')
    })
  })
})
