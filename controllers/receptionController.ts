import { AppDataSource } from "../config/data-source";
import { Request, Response } from "express";
import { Reception } from "../entities/Reception";

//defining the reception entity
const receptionRepo = AppDataSource.getRepository(Reception)
//interface for the reception object
interface ReceptionBody {
    phone: number,
    address: string,
    salary: number
}
//function to view all receptions
export const getReceptions = async (req: Request, res: Response) => {
    try {
        const receptions = await receptionRepo.find()
        if (receptions.length === 0) {
            return res.status(404).json({ message: "Receptions not found" })
        }
        return res.status(200).json({
            message: "Receptions found",
            data: receptions
        })
    } catch (error) {
        console.error("Error Getting Receptions", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//function to create a new reception
export const createReception = async (req: Request, res: Response) => {
    const { phone, address, salary } = req.body as ReceptionBody
    try {
        const existingReception = await receptionRepo.findOneBy({ phone })
        if (existingReception) {
            return res.status(409).json({ message: "Reception already exists" })
        }
        const reception = await receptionRepo.create({
            phone,
            address,
            salary
        })
        const createdReception = await receptionRepo.save(reception)
        return res.status(201).json({
            message: "Reception Created Successfully",
            data: createdReception
        })
    } catch (error) {
        console.error("Error Creating Reception", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//function to update a reception
export const updateReception = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Reception ID" })
    }
    const updates: Partial<ReceptionBody> = req.body
    try {
        const reception = await receptionRepo.findOneBy({ id })
        if (!reception) {
            return res.status(404).json({ message: "Reception not found" })
        }
        const updatedReception = await receptionRepo.save({
            ...reception,
            ...updates
        })
        return res.status(201).json({
            message: "Reception Updated Successfully",
            data: updatedReception
        })
    } catch (error) {
        console.error("Error Updating Reception", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//function to delete a reception
export const deleteReception = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Reception ID" })
    }
    try {
        const reception = await receptionRepo.findOneBy({ id })
        if (!reception) {
            return res.status(404).json({ message: "Reception not found" })
        }
        await receptionRepo.remove(reception)
        return res.status(200).json({
            message: "Reception deleted successfully"
        })
    } catch (error) {
        console.error("Error Deleting Reception", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}