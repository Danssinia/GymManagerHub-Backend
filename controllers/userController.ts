//loginPage, loggedIn 
//import bcrypt
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const loginPage = (req: Request, res: Response) => {
    res.send("Login")
}

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

