import { getDateAsNumber, firstDateIsNewer } from '../util.date'

describe('util.date::unit', () => {
  describe('#getDateAsNumber', () => {
    it('should return a number that is the sum of year, month, day, and hours', async () => {
      const date = new Date('2024-10-25T22:30:00.000Z')
      const result = getDateAsNumber(date)
      expect(result.toString().length).toBe(12)
      expect(result).toBe(202410252230)
    })
    it('should return a number for single digit months and days and hours', async () => {
      const date = new Date('2024-01-01T01:01:00.000Z')
      const result = getDateAsNumber(date)
      expect(result.toString().length).toBe(12)
      expect(result).toBe(202401010101)
    })
  })
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
