import { firstDateIsNewer, removeDays, addDays, addHours, removeHours } from '../util.date'

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
  describe('#removeDays', () => {
    it('should return a date that is 7 days ago', async () => {
      const days = 7
      const result = removeDays(days)
      const expected = new Date()
      expected.setDate(expected.getDate() - days)
      const resultString = result.toISOString().split('T')[0]
      const expectedString = expected.toISOString().split('T')[0]
      expect(resultString).toStrictEqual(expectedString)
    })
  })
  describe('#getTomorrow', () => {
    it('should return date for next day', async () => {
      const expectedStr = '2024-04-03T07:24:11.006Z'
      const result = addDays(1, new Date('2024-04-02T07:24:11.006Z'))
      const resultString = result.toISOString()
      expect(resultString).toStrictEqual(expectedStr)
    })
  })
  describe('#addHours', () => {
    it('should return date for next hour', async () => {
      const expectedStr = '2024-04-02T08:24:11.006Z'
      const result = addHours(1, new Date('2024-04-02T07:24:11.006Z'))
      const resultString = result.toISOString()
      expect(resultString).toStrictEqual(expectedStr)
    })
  })
  describe('#removeHours', () => {
    it('should return date for previous hour', async () => {
      const expectedStr = '2024-04-02T06:24:11.006Z'
      const result = removeHours(1, new Date('2024-04-02T07:24:11.006Z'))
      const resultString = result.toISOString()
      expect(resultString).toStrictEqual(expectedStr)
    })
  })
})
