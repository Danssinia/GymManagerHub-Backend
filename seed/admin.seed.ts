import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { Role } from "../entities/Role.entity";
import bcrypt from 'bcrypt'

export async function adminProfile () {
    const userRepo = await AppDataSource.getRepository(User)
    const roleRepo = await AppDataSource.getRepository(Role)

    const adminRole= await roleRepo.findOne({
        where:{role_name:'Admin'}
    })

    if(!adminRole) {
        throw new Error('Admin role not found')
    }
    const email='admin@gmail.com'
    const saltRounds=10;
    //check for existing admin profile
    const existingAdmin= await userRepo.findOne({
        where:{email:email}
    })
    if(!existingAdmin){
        const savedAdmin = await userRepo.create({
            first_name:"admin",
            last_name:'admin',
            email:email,
            username:'admin',
            password:await bcrypt.hash('happynewyear',10),
            role_id:"9d08f2b9-1054-4497-af68-b88d74bab58f"
        }) 
        await userRepo.save(savedAdmin)
    }else{
        console.log('Admin already Exists')
    }
}