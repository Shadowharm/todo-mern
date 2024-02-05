import { NextFunction, Request, Response } from 'express'
import { ITodo } from './todo.instance'
import TodosService from './todos.service'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'

class TodosController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const todo: ITodo = await TodosService.createTodo(req.cookies.todosToken ?? null, req.body)
      res.status(200).json(todo)
    } catch (e) {
      next(e)
    }
  }
}

export default new TodosController()