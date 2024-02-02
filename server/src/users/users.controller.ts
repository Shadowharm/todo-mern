import {
  Request,
  Response,
  NextFunction
} from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'
import usersService from './users.service'
class AuthController {
  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await usersService.getAll())
      next()
    } catch (e) {
      return next(e)
    }
  }
}

export default new AuthController()