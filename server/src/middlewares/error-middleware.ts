import ApiError from '../exceptions/api-error'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'


export default function (err: ApiError | Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    console.log(err, '<----')
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Внутрення ошибка сервера' })

}