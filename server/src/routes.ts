import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import userRouter from './users/users.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRouter)

export default router