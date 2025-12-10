import express,{Request,Response} from "express"
import {getTrainers} from "../controllers/trainerController"
const router = express.Router()

router.get('/get-trainers', (req: Request, res: Response)=>getTrainers(req,res) )

export default router