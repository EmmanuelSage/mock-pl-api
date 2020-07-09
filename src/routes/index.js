import {Router} from 'express'
import userRouter from './user'
import fixtureRouter from './fixture'

const router = Router()

router.use('/auth', userRouter)
router.use('/', fixtureRouter)

export default router
