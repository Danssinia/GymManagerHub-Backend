import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { Role } from "../entities/Role.entity";
import { CreateUserDto } from "../dtos/user/createUserDto.dto";
import { UpdateUserDto } from "../dtos/user/updateUserDto.dto";
import bcrypt from 'bcrypt'

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role);

    async createUser(createUserDto: CreateUserDto): Promise<User | null> {

        //check for existing user
        const exstingUser = await this.userRepository.findOne({
            where: [
                { email: createUserDto.email },
                { username: createUserDto.username }
            ]
        })

        //checking

        if (exstingUser) {
            if (exstingUser.email === createUserDto.email) {
                throw new Error('Email already Exists')
            }
            if (exstingUser.username === createUserDto.username) {
                throw new Error('Username Already Exists')
            }
        }

        //verify that the role exists

        const role = await this.roleRepository.findOne({
            where: { role_id: createUserDto.role_id }
        })

        //checking

        if (!role) {
            throw new Error('Invalid Role Id or Role doesnt exist')
        }

        //password hash
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(createUserDto.password, saltRounds)

        //now creating the user

        try {
            const user = this.userRepository.create({
                first_name: createUserDto.first_name,
                last_name: createUserDto.last_name,
                email: createUserDto.email,
                username: createUserDto.username,
                password: hashed_password,
                phone: createUserDto.phone ?? "",
                date_of_birth: createUserDto.date_of_birth ? new Date(createUserDto.date_of_birth) : null,
                address: createUserDto.address || null,
                // profile_picture: createUserDto.profile_picture || null,
                role_id: createUserDto.role_id,
                is_active: true
            })
            //saving into the DB
            const savedUser = await this.userRepository.save(user);
            //fetching the user
            const userWithRole = await this.userRepository.findOne({
                where: { user_id: savedUser.user_id },
                relations: ['role']
            })

            // //deleting the password from the returned response
            // delete userWithRole.password;
            return userWithRole;
        } catch (error) {
            console.error('Error Creating the user', error)
            throw new Error('User Creation Failed')
        }
    }

    //function to get all registered users
     async getAllUsers():Promise<Omit<User, 'password'>[]> {

        try {
            const users= await this.userRepository.find({
            relations:['role'],
            order:{createdAt:'DESC'}
        })
        //users.forEach(user=>delete (user as any).password)
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword)
        } catch (error) {
            console.error("Error Fetching the users")
            throw new Error('Fetching users failed')
        }
  
        
    }

    //function to get a single user
    async getUserById (user_id:string):Promise<User | null>{
        
        const user= await this.userRepository.findOne({
            relations:['role'],
            where:{user_id}
        })
        if(!user){
            throw new Error('User not Found')
        }
        //removing the password
        delete (user as any).password
        return user
    }

    //function to update a user
    async updateUser(user_id:string,updateUserDto:UpdateUserDto):Promise<User | null>{
        try {
            //first finding the user
            const user = await this.userRepository.findOne({
            where:{user_id}
        }) 
        if(!user){
            throw new Error ('User not Found')
        }
        //!--the below is another approach for updating the necessary data only
        // Object.assign(user,{
        //     first_name:updateUserDto.first_name
        // })
        //updating only the provided fields
        if(updateUserDto.first_name) user.first_name=updateUserDto.first_name;
        if(updateUserDto.last_name) user.last_name=updateUserDto.last_name;
        if(updateUserDto.date_of_birth) user.date_of_birth=updateUserDto.date_of_birth;
        if(updateUserDto.address) user.address=updateUserDto.address;
        if(updateUserDto.is_Active !==undefined) user.is_active=updateUserDto.is_Active; 

        //saving the updated data
        const updatedUser= await this.userRepository.save(user)


        delete (updatedUser as any).password
        return updatedUser;

        } catch (error) {
        console.error('Error Updating the user')
        throw new Error('Error handling user update')    
        }
    }

    //Delete...function for deactivating the user (soft delete)
    async deactivateUser (user_id:string):Promise<{message:string}> {
        try {
            const exists= await this.userRepository.findOne({
                where:{user_id}
            })

            if (!exists){
                throw new Error('User Not Found')
            }
            exists.is_active= false;
            await this.userRepository.save(exists)
            return {message:'User deactivated successfully'}
        } catch (error) {
            console.error('Error Deleting user')
            throw new Error('Unable deleting user')
        }
    }

    //Delete...function for deactivating the user (soft delete)
    async deleteUser (user_id:string):Promise<{message:string}>{
       
       const result= await this.userRepository.delete(user_id)
       if(result.affected ===0){
        throw new Error('User not found')
       }
        return {message:"User Deleted Successfully"}
    }

   //function to get a users based on role
    async getUsersByRole(role:string):Promise<User[]> {
        const users=await this.userRepository.find({
            where:{
                role:{role_name:role}
            },
            relations:['role']
        })
        users.forEach(user=>delete (user as any).password)
        return users;
    }
}