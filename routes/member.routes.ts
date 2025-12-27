import { Router } from "express";
const router = Router()
import { MemberController } from "../controllers/member.controller";

const memberController = new MemberController
//route to create members
router.get(
    '/create-member',
    memberController.createMember
)

export default router