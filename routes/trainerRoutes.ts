import express,{Request,Response} from "express"
import {getTrainers, createTrainer, updateTrainer, deleteTrainer} from "../controllers/trainerController"
const router = express.Router()

router.get('/get-trainers', (req: Request, res: Response)=>getTrainers(req,res) )

router.post('/create-trainer',(req:Request,res:Response)=>createTrainer(req,res))

router.patch('/update-trainer/:id',(req:Request,res:Response)=>updateTrainer(req,res))

router.get('/delete-trainer/:id',(req:Request,res:Response)=>deleteTrainer(req,res))

export default router