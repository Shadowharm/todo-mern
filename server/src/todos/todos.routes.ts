import { Router } from 'express'
import todosController from './todos.controller'
import { body } from 'express-validator'

const todosRoutes = Router()

todosRoutes.post('/',
  body('title').notEmpty().withMessage('Не указано название задачи'),
  todosController.create)

export default todosRoutes