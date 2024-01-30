import {Router} from 'express'
import userController from '../controllers/user.controller'
const userRouter = Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/activate/:link', userController.activate)
userRouter.get('/refresh', userController.refresh)

export default userRouter