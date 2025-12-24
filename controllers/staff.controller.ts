import { Request,Response } from "express";
import { StaffService } from "../services/staff.service";
import { CreateStaffDto } from "../dtos/staff/createStaffDto.dto";
import { UpdateStaffDto } from "../dtos/staff/updateStaffFto.dto";
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
        const staff = this.staffService.getAllStaff()
        return res.status(200).json({
            success:true,
            message:"Staffs Fetched Successfully",
            data:staff
        })
       } catch (error) {
        console.error("Error getting the staffs",error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch staff",
            error:error instanceof Error &&error.message
        })
       }


    }
}