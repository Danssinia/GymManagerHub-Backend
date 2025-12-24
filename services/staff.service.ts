import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { Staff } from "../entities/Staff.entity";
import { Role } from "../entities/Role.entity";
import { CreateStaffDto } from "../dtos/staff/createStaffDto.dto";
import { UpdateStaffDto } from "../dtos/staff/updateStaffFto.dto";
import bcrypt from 'bcrypt'

export class StaffService {

    private userRepo = AppDataSource.getRepository(User)
    private roleRepo = AppDataSource.getRepository(Role)
    private staffRepo = AppDataSource.getRepository(Staff)

    //function to create a user and at the same time staff
    async createStaff (createStaffDto:CreateStaffDto,roleName:'Trainer' | 'Receptionist'):Promise<Staff | null>{
        //starting transaction
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {

        //checking if there is existing user

        const staffExists = await this.userRepo.findOne({
            where:[
                {email:createStaffDto.email},
                {username:createStaffDto.username}
            ]
        })

        if(staffExists){
            if(staffExists.email === createStaffDto.email){
                throw new Error ("Email Already Exists")
            }
            
            if(staffExists.username === createStaffDto.username){
                throw new Error ("Username Already Exists")
            }
        }

        //checking if the role exists or not
        const roleExists = await this.roleRepo.findOne({
            where:{role_name:roleName}
        })

        if(!roleExists){
            throw new Error("Invalid Role ID or Role doesn't exist")
        }

        //hashing the incoming password
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(createStaffDto.password,saltRounds)

        //creating the User
        const user = this.userRepo.create({
            first_name:createStaffDto.first_name,
            last_name:createStaffDto.last_name,
            email:createStaffDto.email,
            username:createStaffDto.username,
            password:hashed_password,
            phone:createStaffDto.phone ??"",
            date_of_birth:createStaffDto.date_of_birth ?? "",
            address:createStaffDto.address ??"",
            role_id:roleExists.role_id,
            is_active:true
        }) 
        //saving the user
        const savedUser = await queryRunner.manager.save(user)

        //creating the staff
        const staff =  this.staffRepo.create({
            user_id:savedUser.user_id,
            hire_date:new Date(createStaffDto.hire_date),
            salary:createStaffDto.salary,
            employment_status:createStaffDto.employment_status || 'full-time',
            //trainer-specific fields
            experience:createStaffDto.experience || 0,
            specialization:createStaffDto.specialization ??""
            // specialization: createStaffDto.specialization ? createStaffDto.specialization.join(',') : ""
        })
        const savedstaff= await queryRunner.manager.save(staff)

        //commit transaction
        await queryRunner.commitTransaction()

        //fetching the userWithRole

        const completeStaff =await this.staffRepo.findOne({
            where:{staff_id:savedstaff.staff_id},
            relations:['user', 'user.role']
        })
        delete (completeStaff as any).password
        return completeStaff;
     } catch (error) {
        //Rollback transaction on error
        await queryRunner.rollbackTransaction()
        throw error
     } finally {
        await queryRunner.release()
     }
    }

    //method to get all the registered staffs (both trainer and receptionists)
    async getAllStaff (roleName?:'Trainer' | 'Receptionist'):Promise<Staff[]>{
        const queryBuilder = await this.staffRepo
        .createQueryBuilder('staff')
        .leftJoinAndSelect('staff.user','user')
        .leftJoinAndSelect('user.role', 'role')
        .orderBy('staff.hire_date','DESC')

        //filter by role
        if(roleName){
            //add conditions for specific role
            queryBuilder.where('role.role_name=:roleName',{roleName})
        }else {
            //fetch all staffs except admin
            queryBuilder.where('role.role_name IN (:...roles)',{
                roles:['Trainer','Receptionist']
            })
        }
        const allStaffs = await queryBuilder.getMany()
        
        if(allStaffs.length===0){
            throw new Error("Staff member not found")
        }
        // Remove passwords
    allStaffs.forEach(s => {
      if (s.user) delete (s.user as any).password;
    });
        return allStaffs
}
    //metho to get all trainers
    async getAllTrainers () {
        return this.getAllStaff('Trainer')
    }

    //methof to get all receptionists
    async getAllReceptionists () {
        return this.getAllStaff('Receptionist')
    } 

    //method to get single user by using userId

    async getStaffByUserId (user_id:string):Promise<Staff>{
        const staff= await this.staffRepo.findOne({
            where:{user_id},
            relations:['user','user.role']
        })

        if(!staff){
            throw new Error ("Staff member not found")
        }
        delete (staff as any).password
        return staff
    }

    //method to get single user by using staffId

    async getStaffById (staff_id:string):Promise<Staff> {
        const staff = await this.staffRepo.findOne({
            where:{staff_id},
            relations:['user','user.role','members_created','assigned_members']
        })
        
        if(!staff){
            throw new Error('staff member not found')
        }

        delete (staff as any).password
        return staff
    }

}
