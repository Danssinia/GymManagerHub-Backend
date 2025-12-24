import { Router } from "express"
import { StaffController } from "../controllers/staff.controller"
const router = Router()
const staffController = new StaffController()
//route to create trainers
router.post(
    '/trainer',
    staffController.createTrainer
)

//route to create receptionists
router.post(
    '/receptionist',
    staffController.createReceptionist
)

//route to get all staffs
router.get(
    '/allStaffs',
    staffController.getAllStaff
)

export default router