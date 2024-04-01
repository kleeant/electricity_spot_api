import { parseFileName } from '../util.file'
describe('util.file::unit', () => {
  describe('#parseFileName', () => {
    it('should return fileName and path', () => {
      // Arrange
      const filename = '/path/to/file.ts'
      const expected = {
        fileName: 'file',
        path: '/path/to'
      }
      // Act
      const result = parseFileName(filename)
      // Assert
      expect(result).toEqual(expected)
    })
    it('should return fileName and path for this file', () => {
      const result = parseFileName(__filename)
      const path = result.path.split('/src/')
      // Assert
      expect(result.fileName).toBe('util.file.unit.test')
      expect(path[1]).toBe('lib/util/__tests__')
    })
    it('should remove filetype from filename', () => {
      // Arrange
      const filename = '/path/to/file.ts'
      const expected = {
        fileName: 'file',
        path: '/path/to'
      }
      // Act
      const result = parseFileName(filename)
      // Assert
      expect(result).toEqual(expected)
    })
  })
})
