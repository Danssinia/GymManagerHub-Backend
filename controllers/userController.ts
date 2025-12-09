import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from '../entities/User'
import { validate, Validate } from "class-validator";
import { AppDataSource } from "../config/data-source";
const saltRounds = 10;
const maxAge = 3 * 24 * 60 * 60;

interface JwtUser {
    email: String,
    password: String
}
//function to create jwt token
const createToken = (user: JwtUser) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Secret not defined in the environment variables")
    }
    return jwt.sign({ user }, secret, {
        expiresIn: maxAge
    })
}
//function to view the login page
export const loginPage = (req: Request, res: Response) => {
    res.send("Login")
}

//function to handle the login
export const loggedIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string, password: string };
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt);
        const user: JwtUser = {
            email: email,
            password: hashedPassword
        }
        const token = createToken(user)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        console.log('Token', token)
        console.log('Email: ', email);
        console.log('Password: ', hashedPassword)
        res.send("LoggedIn")
    } catch (error) {
        console.log('Error during Hashing', error)
        res.status(500).send("Error during Hashing")
    }
}

//function to handle the user registration
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as { name: string, email: string, password: string }

    try {
        //check if the user already exists
        const userRepo = AppDataSource.getRepository(User)
        const existingUser = await userRepo.findOneBy({ email })

        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = userRepo.create({
            name,
            email,
            password: hashedPassword
        })
        const errors = await validate(user)
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation Error", errors })
        }

        await userRepo.save(user)
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//function to access the users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const users = await userRepo.find()
        res.status(200).json({ users })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}