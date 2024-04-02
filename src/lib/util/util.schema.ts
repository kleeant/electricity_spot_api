import type { TSchema } from '@sinclair/typebox'
import { TypeCompiler, type ValueError } from '@sinclair/typebox/compiler'
import ValidationError from '../error/error.validation'

export const validateSchema = <T>(value: T, schema: TSchema): ValueError[] => {
  const C = TypeCompiler.Compile(schema)
  const errors = [...C.Errors(value)]
  return errors
}

export const validate = <T>(value: T, schema: TSchema): void => {
  const errors = validateSchema(value, schema)
  if (errors.length > 0) {
    throw new ValidationError(JSON.stringify(errors))
  }
}
