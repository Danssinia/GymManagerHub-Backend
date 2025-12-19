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
router.patch(
    '/update-user/:id',
    userController.updateUser)

//route to delete a user(Soft Delete)
router.delete(
    '/delete-a-user/:id',
    userController.softDeleteUser
)

//route to delete a user(Hard Delete)
router.delete(
    '/hard-delete-user/:id',
    userController.hardDeleteUser)

//route to get users based on their role
router.get(
    '/users-by-role/:role',
    userController.getUsersByRole)

export default router
