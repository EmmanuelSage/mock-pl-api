import {Router} from 'express'
import userRouter from './user'

const router = Router()

router.use('/auth', userRouter)

export default router
