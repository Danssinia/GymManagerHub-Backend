import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { Request, Response } from 'express'
const router = Router()
const userController = new UserController()

//route to create the user
router.post(
    '/create-user',
    userController.createUser
)

export default router
