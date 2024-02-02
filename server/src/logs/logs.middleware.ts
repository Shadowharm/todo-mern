import logsService from './logs.service'
import { Request, Response } from 'express'
export default async function (req: Request, res: Response) {
  await logsService.saveLog(req.url, res.statusCode, res.locals.error ?? null)
}