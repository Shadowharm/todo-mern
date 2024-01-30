import { Router } from 'express'
import userController from '../controllers/user.controller'
import { body } from 'express-validator'
const userRouter = Router()

userRouter.post('/signup',
  body('email').isEmail().withMessage('Невалидный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не короче 6 символов '),
  userController.signup)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/activate/:link', userController.activate)
userRouter.get('/refresh', userController.refresh)

export default userRouter