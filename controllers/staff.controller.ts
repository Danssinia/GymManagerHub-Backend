import { Request,Response } from "express";
import { StaffService } from "../services/staff.service";
import { CreateStaffDto } from "../dtos/staff/createStaffDto.dto";
import { UpdateStaffDto } from "../dtos/staff/updateStaffDto.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class StaffController {
    private staffService:StaffService

    constructor () {
        this.staffService= new StaffService()
    }
    //function to create the trainer
    createTrainer = async (req:Request,res:Response) => {
        try {
        //changing from the json to dto class
        const createStaffDto = plainToClass(CreateStaffDto,req.body)

        
        //validating the errors
        const errors= await validate(createStaffDto)
        if(errors.length > 0){
            return res.status(400).json({
                success:false,
                message:"validation failed",
                errors:errors.map(error=>({
                    property:error.property,
                    message:error.constraints
                }))
            })
        }

        //calling the service
        const staff = await this.staffService.createStaff(createStaffDto,"Trainer")
        return res.status(201).json({
            success:true,
            message:"User Created Successfully",
            data:staff
        })
            
        } catch (error) {
            console.error("Error creating a user",error)
            if(error instanceof Error && error.message.includes("already exists")){
                return res.status(409).json({
                    success:false,
                    message:error.message
                })
            }

            if(error instanceof Error && error.message.includes("role doesn't exist")){
                return res.status(400).json({
                    success:false,
                    message:error.message
                })
            }

            return res.status(500).json({
                success:false,
                message:"Unable creating a user"
            })
        }
    }

    //function to create the receptionist
    createReceptionist = async (req:Request,res:Response) => {
        
        try {
            //changing from the plain json to dto class
            const createStaffDto =  plainToClass(CreateStaffDto,req.body)

            //validating the incoming dto
            const errors =await validate(createStaffDto)
            if(errors.length>0){
                return res.status(400).json({
                    success:false,
                    message:"Validation failed",
                    errors:errors.map(error=>({
                        property:error.property,
                        message:error.constraints
                    }))
                })
            } 

            //calling the service to create the receptionist
            const receptionist = await this.staffService.createStaff(createStaffDto,'Receptionist')
            return res.status(201).json({
                success:true,
                message:"Receptionist created Successfully",
                data:receptionist
            })
        } catch (error) {
            console.error("Error Creating Receptionists")
            if(error instanceof Error && error.message.includes('already exists')){
                return res.status(409).json({
                    success:false,
                    message:error.message
                })
            }

            if(error instanceof Error && error.message.includes('role does not exist')){
                return res.status(400).json({
                    success:false,
                    message:error.message
                })
            }
            //generic error
            return res.status(500).json({
                success:false,
                message:"Failed to create receptionist",
                error:error instanceof Error && error.message
            })
        }
    }

    //function to get all registered staffs
    getAllStaff = async (req:Request,res:Response)=>{
       try {
         //calling the service
        const staff =await this.staffService.getAllStaff()
        return res.status(200).json({
            success:true,
            message:"Staffs Fetched Successfully",
            data:staff
        })
        
       } catch (error) {
        console.error("Error getting the staffs",error)

        if(error instanceof Error && error.message.includes('staff member not found')){
            return res.status(404).json({
                success:false,
                message:error.message
            })
        }
        return res.status(500).json({
            success:false,
            message:"Failed to fetch staff",
            error:error instanceof Error &&error.message
        })
       }
    }

    //function to get all Trainers
    getAllTrainers = async (req:Request,res:Response)=>{
        try {
            const trainers = await this.staffService.getAllTrainers()

            return res.status(200).json({
                success:true,
                message:"Trainers fetched successfully",
                data:trainers
            })
        } catch (error) {
            console.error("Error Fetching staff",error)
            if(error instanceof Error && error.message.includes("Staff member not found")){
                return res.status(404).json({
                    success:false,
                    message:error.message
                })
            }

            return res.status(500).json({
                success:false,
                message:error instanceof Error && error.message
            })
        }
    }

    //function to get All Receptionists
    getAllReceptionists = async (req:Request,res:Response) => {
        try {
            const receptionists =  await this.staffService.getAllReceptionists()
            return res.status(200).json({
                success:true,
                message:"Receptionists fetched successfuly",
                data:receptionists
            })
        } catch (error) {
            console.error("Error fetching receptionists",error)
            if(error instanceof Error && error.message.includes("Staff member not found")){
                return res.status(404).json({
                    success:false,
                    message:error.message
                })
            }
            
            return res.status(500).json({
                success:false,
                message:error instanceof Error && error.message
            })
        } 
    }

    //function to getStaffByUserId
    getStaffByUserId= async (req:Request,res:Response) => {
        const {id} = req.params
        try {
            //callign the service
            const user = await this.staffService.getStaffByUserId(id as string)
            return res.status(200).json({
                success:true,
                message:"User fetched successfully",
                data:user
            })
        } catch (error) {
            console.error("Error getting the staff",error)
            if(error instanceof Error && error.message.includes("Staff member not found")){
                return res.status(404).json({
                    success: false,
                    message:error.message
                })
            }
            return res.status(500).json({
                success:false,
                message:'Failed to fetch staff'
            })
        }
    }

    //function to get staff by staffId

    getStaffById = async (req:Request,res:Response) => {
        const {id} = req.params;
        try {
            //calling  the service here
            const staff = await this.staffService.getStaffById(id as string)
            return res.status(200).json({
                success:true,
                message:"Staff Fetched Successfully",
                data:staff
            })
        } catch (error) {
            console.error("Error getting the staff",error)

            if(error instanceof Error && error.message.includes('staff member not found')){
                return res.status(404).json({
                    success:false,
                    message:error.message
                })
            }

            return res.status(500).json({
                success:false,
                message:"Unable to fetch the staff",
                error:error instanceof Error && error.message
            })
        }
    }

    //function to update staff details

    updateStaff = async (req:Request,res:Response) => {
        const {id} = req.params
        try {
            //plain json to DTO class
            const updateStaffDto = plainToClass(UpdateStaffDto,req.body)

            //validation 
            const errors = await validate(updateStaffDto)
            if(errors.length > 0){
                return res.status(400).json({
                    success:false,
                    message:'Validation failed',
                    errors:errors.map(error=>({
                        property:error.property,
                        message:error.constraints
                    }))
                })
            }
            const updatedStaff = await this.staffService.updateStaff(id as string,updateStaffDto)
            return res.status(200).json({
                success:true,
                message:"Staff updated successfully",
                data:updatedStaff
            })
        } catch (error) {
            console.error("Error Updating the user",error)
            if(error instanceof Error && error.message.includes("staff member not found")){
                return res.status(404).json({
                    success:true,
                    message:error.message
                })
            }

            return res.status(500).json({
                success:false,
                message:"Unable to update the staff"
            })
        }
    }

    //function to deactivate the staff (soft delete)
    deactivateStaff = async (req:Request,res:Response) => {
        const {id} = req.params
        try {
            const deactivatedStaff = await this.staffService.deactivateStaff(id as string)
            return res.status(200).json({
                success:true,
                message:deactivatedStaff
            }) 
        } catch (error) {
            console.error("Error deactivating staff")
            if(error instanceof Error && error.message.includes('staff member not foun')){
                return res.status(404).json({
                    success:false,
                    message:error.message
                })
            }
            //generic error
            return res.status(500).json({
                success:false,
                message:'Unable to update staff'
            })
        }
    }
    deleteStaff = async (req:Request,res:Response) => {
        console.log("controller")
    }
}