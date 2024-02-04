import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import userRouter from './users/users.routes'
import logsRouter from './logs/logs.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRouter)
router.use('/logs', logsRouter)

export default router