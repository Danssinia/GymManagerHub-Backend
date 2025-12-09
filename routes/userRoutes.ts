import express, { Request, Response } from "express";
import { loginPage, loggedIn } from "../controllers/userController";
const router = express.Router();

router.get('/login', (req: Request, res: Response) => loginPage(req, res))

router.post('/login', (req: Request, res: Response) => loggedIn(req, res))


module.exports = router