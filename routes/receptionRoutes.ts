import express, { Request, Response } from "express"
import { createReception, deleteReception, getReceptions, updateReception } from "../controllers/receptionController"

const router = express.Router()

router.get('/get-receptions', (req: Request, res: Response) => getReceptions(req, res))

router.post('/create-reception', (req: Request, res: Response) => createReception(req, res))

router.patch('/update-reception/:id', (req: Request, res: Response) => updateReception(req, res))

router.delete('/delete-reception/:id', (req: Request, res: Response) => deleteReception(req, res))

export default router