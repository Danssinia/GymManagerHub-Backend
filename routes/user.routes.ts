import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
const router = Router()
const userController = new UserController()

//route to create the user
router.post(
    '/create-user',
    userController.createUser
)

//route to get all users
router.get(
    '/all-users',
    userController.fetchUsers)

//route to get user by id (specific user)
router.get(
    '/get-a-user/:id',
    userController.getUserById)

//route to update a user
router.get(
    '/update-user/:id',
    userController.updateUser)

export default router
