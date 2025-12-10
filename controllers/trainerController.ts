
import {Request,Response} from "express"
import { AppDataSource } from "../config/data-source"
import { Trainer } from "../entities/Trainer"
interface TrainerData {
    specialization:string,
    experience:string,
    phone:number,
    address:string,
    salary:number
}
//defining the entity manager
const trainerRepo = AppDataSource.getRepository(Trainer); 
//function to get all the trainers
export const getTrainers = async (req:Request, res:Response) => {
    try {
        const allTrainers= await trainerRepo.find()
        
        if(allTrainers.length === 0){
        return res.status(404).json({message:"No Trainers Found"})
    }
        return res.status(200).json(allTrainers)
    } catch (error) {
        console.error("Error Fetching Trainers",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

//funtion to create the trainers
export const createTrainer = async (req:Request,res:Response) =>{
    const {specialization,experience,phone,address,salary} = req.body as TrainerData
    try {
        const existingTrainer= await trainerRepo.findOneBy({phone})

        if(existingTrainer){
            res.status(400).json({message:"Trainer already Exists"})
        }

        const trainer= trainerRepo.create({
            specialization,
            experience,
            phone,
            address,
            salary
        })

       const savedTrainer= await trainerRepo.save(trainer)
       return res.status(201).json({
        message:"Trainer Created Successfully",
        data:savedTrainer
    })

    } catch (error) {
        console.error("Error Creating trainer",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
} 

//function to update the trainers

export const updateTrainer = async (req:Request, res:Response) =>{
    const id= Number(req.params.id);
    //to be changed later because id's are not supposed to be number only
    if(isNaN(id)){
        return res.status(400).json({message:"Invalid trainer ID"})
    }
    const updates:Partial<TrainerData> =req.body
    try {
        const trainer = await trainerRepo.findOneBy({id})
        if(!trainer){
           return res.status(404).json({message:"Trainer Not Found"})
        }
        const updatedTrainer= await trainerRepo.save({
            ...trainer,
            ...updates
        })
        return res.status(201).json({
            message:"Trainer Updated Successfully",
            data:updatedTrainer
        })
    } catch (error) {
        console.log("Error Updating Trainer",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

//function to delete trainer
export const deleteTrainer = async (req:Request,res:Response) =>{
    const id = Number(req.params.id)
    //to be changed later because id's are not supposed to be number only
    if(isNaN(id)){
        return res.status(400).json({message:"Invalid trainer ID"})
    }
    try {
        const trainer = await trainerRepo.findOneBy({id})
        if(!trainer){
        res.status(404).json({message:"Trainer Not Found"})
    }
    await trainerRepo.remove(trainer!)
        return res.status(200).json({message:"Trainer Deleted Successfully"})

    } catch (error) {
     console.log("error deleting trainer",error)
     return res.status(500).json({message:"Internal Server Error"})   
    }
    

}