import { DebugTimer } from '../util.debugTimer'
describe('util.debugTimer::unit', () => {
  const delay = async (ms: number): Promise<void> => {
    return await new Promise(resolve => setTimeout(resolve, ms))
  }
  describe('#reportTime', () => {
    it('should return time taken', async () => {
      const timer = new DebugTimer()
      await delay(1000)
      const result = timer.report()
      // there can be some small variance depending on the system. Can return 1007 for example
      expect(result).toBeGreaterThan(999)
      expect(result).toBeLessThan(1100)
    })
  })
})
