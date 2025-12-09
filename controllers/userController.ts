//loginPage, loggedIn 
//import bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
//function to create jwt token
const createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

const loginPage = (req: Request, res: Response) => {
    res.send("Login")
}

const loggedIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
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

module.exports = {
    loginPage,
    loggedIn
}