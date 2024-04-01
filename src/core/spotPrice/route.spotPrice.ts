import type { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../infrastructure/server/server.asyncHandler'
import { SpotPriceService } from './service.spotPrice'
const service = new SpotPriceService()
const getSpotPrices = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dateFrom = new Date(req.query.date_from as string)
  const dateTo = new Date(req.query.date_to as string)
  const data = await service.getSpotPriceSummary(dateFrom, dateTo)
  res.json({ data })
})

export default {
  getSpotPrices
}
