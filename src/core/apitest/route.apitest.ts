import type { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../infrastructure/server/server.asyncHandler'
import { ApiTestService } from './service.apitest'
const service = new ApiTestService()
const getTest = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const uuids = req.query.ids
  const data = await service.getTest(uuids as string[])
  res.json({ data })
})

const postTest = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = await service.postTest(req.body)
  res.json({ data: result })
})

export default {
  getTest,
  postTest
}
