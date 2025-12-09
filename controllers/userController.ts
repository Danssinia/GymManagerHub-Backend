import { Request, Response } from "express";

const login = (req:Request, res:Response)=>{
res.status(200).json({
    message:"Daniel has logged in successfylly"
})
}

module.exports = {
    login
}