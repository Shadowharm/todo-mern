
import { Request, Response } from 'express'
import logsService from './logs.service'
class LogsController {
  async getAll (req: Request, res: Response) {
    res.json(await logsService.getAll())
  }
}