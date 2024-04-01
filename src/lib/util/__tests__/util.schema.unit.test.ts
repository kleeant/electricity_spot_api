import { Type } from '@sinclair/typebox'
import { validate, validateSchema } from '../util.schema'
describe('util.schema::unit', () => {
  describe('#validateSchema', () => {
    it('should return a list of errors for an invalid schema', () => {
      const schema = Type.String()
      const errors = validateSchema(1, schema)
      expect(errors).toBeDefined()
      expect(errors.length).toBe(1)
      expect(errors[0].message).toBe('Expected string')
    })
  })
  describe('#validate', () => {
    it('should not throw for a valid schema', () => {
      const schema = Type.String({ minLength: 1 })
      expect(() => { validate('test', schema) }).not.toThrow()
    })
    it('should throw for an invalid schema', () => {
      const schema = Type.String({ minLength: 1 })
      expect(() => { validate(1, schema) }).toThrow()
    })
  })
})
