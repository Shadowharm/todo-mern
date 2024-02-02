import authService from './auth.service'
import {
  Request,
  Response,
  NextFunction
} from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'
class AuthController {
  async signup (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const { email, password } = req.body
      const userData = await authService.signup(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      return next(e)
    }
  }

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await authService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout (req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
      return next(e)
    }
  }

  async activate (req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link
      await authService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      return next(e)
    }
  }

  async refresh (req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
      console.error(e)
    }
  }
}

export default new AuthController()