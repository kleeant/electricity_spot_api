import type { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../infrastructure/server/server.asyncHandler'
// import { SpotPriceService } from './service.spotPrice'
// const service = new SpotPriceService()
const getTest = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const uuids = req.query.ids
  // const data = await service.getTest(uuids as string[])
  res.json({ data: {} })
})

export default {
  getTest
}
