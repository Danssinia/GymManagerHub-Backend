import express, { Request, Response } from "express";
import { loginPage, loggedIn, registerUser, getUsers } from "../controllers/userController";
const router = express.Router();

router.get('/login', (req: Request, res: Response) => loginPage(req, res))

router.post('/login', (req: Request, res: Response) => loggedIn(req, res))

router.post('/register', (req: Request, res: Response) => registerUser(req, res))

router.get('/users', (req: Request, res: Response) => getUsers(req, res))

export default router
