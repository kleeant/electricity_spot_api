
/**
 * @description - ValidationError is passed as is from the API. statusCode is used for the response.
 */
export default class ValidationError extends Error {
  constructor (msg: string) {
    super(msg)
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
