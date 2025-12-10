import {Request,Response} from "express"

export const getTrainers = (req:Request, res:Response) => {
    res.send("All Trainers")
}

export const createTrainer = async (req:Request,res:Response) =>{} 