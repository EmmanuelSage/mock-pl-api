import {Router} from 'express'
import UserController from '../controllers/user.controller'
import UserService from '../services/user.service'

const userService = new UserService()

const userController = new UserController(userService)

const router = Router()

router.post('/signup', (req, res) => userController.createUser(req, res))
router.post('/login', (req, res) => userController.loginUser(req, res))

export default router
