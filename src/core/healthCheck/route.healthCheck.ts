import type { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../infrastructure/server/server.asyncHandler'
import packageJson from '../../../package.json'

const getHealthCheck = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = {
    uptime: process.uptime(),
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: packageJson.version
  }
  res.json(result)
})

export default {
  getHealthCheck
}
