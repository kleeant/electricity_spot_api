import { firstDateIsNewer } from '../util.date'

describe('util.date::unit', () => {
  describe('#firstDateIsNewer', () => {
    it('should return true if the first date is newer', async () => {
      const date = new Date('2024-10-25T22:30:00.000Z')
      const compare = new Date('2024-10-25T22:29:00.000Z')
      const result = firstDateIsNewer(date, compare)
      expect(result).toBe(true)
    })
    it('should return false if the first date is older', async () => {
      const date = new Date('2024-10-25T22:30:00.000Z')
      const compare = new Date('2024-10-25T22:31:00.000Z')
      const result = firstDateIsNewer(date, compare)
      expect(result).toBe(false)
    })
  })
})
