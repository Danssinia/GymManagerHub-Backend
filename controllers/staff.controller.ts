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

    createStaff = async (req:Request,res:Response) => {
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

        //calling the service 
        // const staffs= await this.staffService.createStaff(createStaffDto:CreateStaffDto,roleName)
    }
}