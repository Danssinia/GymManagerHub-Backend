import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { Role } from "../entities/Role.entity";
import { CreateUserDto } from "../dtos/user/createUserDto.dto";
import { UpdateUserDto } from "../dtos/user/updateUserDto.dto";
import bcrypt from 'bcrypt'

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role);
    
    async createUser (createUserDto:CreateUserDto): Promise<void> {

        //check for existing user
        const exstingUser = await this.userRepository.findOne({
            where:[
                {email:createUserDto.email},
                {username:createUserDto.username}
            ]
        })

        //checking

        if (exstingUser){
            if (exstingUser.email === createUserDto.email){
                throw new Error('Email already Exists')
            }
            if (exstingUser.username === createUserDto.username){
                throw new Error('Username Already Exists')
            }
        }

        //verify that the role exists

        const role = await this.roleRepository.findOne({
            where:{role_id : createUserDto.role_id}
        })

        //checking

        if(!role){
            throw new Error('Invalid Role Id or Role doesnt exist')
        }

        //password hash
        const saltRounds=10;
        const hashed_password = await bcrypt.hash(createUserDto.password,saltRounds)

        //now creating the user

        try {
            const user = this.userRepository.create({
            first_name:createUserDto.first_name,
            last_name:createUserDto.last_name,
            email:createUserDto.email,
            username:createUserDto.username,
            password:hashed_password,
            phone:createUserDto.phone??"",
            // phone:createUserDto.phone || null,
            date_of_birth:createUserDto.date_of_birth ? new Date(createUserDto.date_of_birth):null,
            address:createUserDto.address || null,
            profile_picture:createUserDto.profile_picture || null,
            role_id:createUserDto.role_id,
            is_active:true
        })
        //saving into the DB
        const savedUser = await this.userRepository.save(user);
        //fetching the user
        const userWithRole = await this.userRepository.findOne({
            where:{user_id:savedUser.user_id},
            relations:['role']
        })
        } catch (error) {
          console.error('Error Creating the user',error)
          throw new Error('User Creation Failed')  
        }
    }
}