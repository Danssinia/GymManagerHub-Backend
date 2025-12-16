import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dtos/user/createUserDto.dto'
import { UpdateUserDto } from '../dtos/user/updateUserDto.dto'
import { isInstance, validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

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

}