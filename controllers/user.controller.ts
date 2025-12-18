import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dtos/user/createUserDto.dto'
import { UpdateUserDto } from '../dtos/user/updateUserDto.dto'
import { isInstance, validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

interface userData{
        id:string
    }
export class UserController {
    
    private userSerivce!: UserService;

    constructor() {
        this.userSerivce = new UserService()
    }

    createUser = async (req: Request, res: Response) => {
        try {
            //converting plain JSON to DTO class
            const createUserDto = plainToClass(CreateUserDto, req.body)

            //validating the dto
            const errors = await validate(createUserDto)
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    messgae: 'validation failed',
                    errors: errors.map(error => ({
                        property: error.property,
                        message: error.constraints
                    }))
                })
            }

            //calling the service 
            const user = await this.userSerivce.createUser(createUserDto)

            return res.status(201).json({
                sucess: true,
                message: "User Created Successfully",
                data: user
            })
        } catch (error) {
            console.error("Error Creating the User", error)

            if (error instanceof Error && error.message.includes('already exists')) {
                return res.status(409).json({
                    success: false,
                    message: error.message,
                })
            }

            if (error instanceof Error && error.message.includes('invalid role id')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }


            return res.status(500).json({
                success: false,
                message: "User Creation Failed",
                error: error instanceof Error ? error.message : "Unknown Error"
            })
        }
    }

    //method to fetch all users
    fetchUsers = async (req:Request,res:Response) =>{
        try {
            //calling the service
            const allusers=await this.userSerivce.getAllUsers()
            return res.status(200).json({
                message:"Users fetched successfully",
                data:allusers
            })
        } catch (error) {
            console.error("Error Fetching Users",error)
            //i will manage the errors here later
        }
    }

    //method to fetch a user by id
    getUserById = async (req:Request,res:Response) =>{
        const {id} =req.params ;
        try {
            const user= await this.userSerivce.getUserById(id??"")
            return res.status(200).json({
                success:true,
                message:"User fetched successfully",
                data:user,
            })
        } catch (error) {
            console.error("Error fetching user")
            return res.status(500).json({
                success:false,
                message:"Failed to fetch user"
            })
        }
        
    }

    //method to update a user
    async updateUser(req:Request,res:Response){
        const {id}=req.params
        //converting plainJSON to DTO class
        const updateUserDto=plainToClass(UpdateUserDto,req.body)

        //validating the DTOs
        const errors=await validate(updateUserDto)

        if(errors.length>0){
            return res.status(400).json({
                success:false,
                message:"validation failed",
                errors:errors.map(error=>({
                    property:error.property,
                    message:error.constraints
                }))
            })
        }
        try {
            //calling the service
        const updatedUser = await this.userSerivce.updateUser(id as string,updateUserDto) 
        return res.status(200).json({
            success:true,
            message:"User Updated Successfully",
            data:updatedUser
        })
        } catch (error) {
            console.error("Error fetching user",error)
            return res.status(500).json({
                success:false,
                message:'Failed To fetch the user'
            })
        }
        


    }

}