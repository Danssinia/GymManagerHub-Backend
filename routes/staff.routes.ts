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
//?? this is not working you have to see it again
router.get(
    '/allStaffs',
    staffController.getAllStaff
)

//route to get staff by user id
router.get(
    '/user/:userId',
    staffController.getStaffByUserId
)

//router to get staff by staff_id
router.get(
    '/:id',
    staffController.getStaffById
)

//route to get All Trainers
router.get(
    '/users/trainers',
    staffController.getAllTrainers
)

//route to get All Receptionists
router.get(
    '/users/receptionists',
    staffController.getAllReceptionists
)


//patch routes
//route ro update staff details
router.patch(
    '/update-staff/:id',
    staffController.updateStaff
)

//route to deactivate the staff (soft delete)
router.patch(
    '/deactivate-staff/:id',
    staffController.deactivateStaff
)

//delete routes
//route to delete the staff (hard delete)
router.get(
    '/delete-staff',
    staffController.deleteStaff
)

export default router