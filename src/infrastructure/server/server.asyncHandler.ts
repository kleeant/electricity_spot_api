import type { NextFunction, Request, Response } from 'express'

/**
 * @description - wraps async functions in promise to make express error handling work.
 * Without this errors from async functions just get swallowed to a dark hole.
 */
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction): any => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}
export default asyncHandler
