import { Router } from "express"
import { StaffController } from "../controllers/staff.controller"
const router = Router()
const staffController = new StaffController()
//route to create trainers
router.post(
    '/trainers',
    staffController.createStaff
)

export default router