import {Router} from 'express'
import userRouter from './user'
import fixtureRouter from './fixture'
import teamRouter from './team'

const router = Router()

router.use('/auth', userRouter)
router.use('/', fixtureRouter)
router.use('/', teamRouter)

export default router
