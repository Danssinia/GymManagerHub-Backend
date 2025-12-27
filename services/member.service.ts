import { AppDataSource } from "../config/data-source"
import { CreateMemberDto } from "../dtos/member/createMemberDto.dto"
import { UpdateMemberDto } from "../dtos/member/updateMemberDto.dto"
import { User } from "../entities/User.entity"
import { Role  } from "../entities/Role.entity"
import { Member } from "../entities/Member.entity"
import { Staff } from "../entities/Staff.entity"
import bcrypt from 'bcrypt'
export class MemberService {
    //method to create a member
async createMember ():Promise<{message:string}> {
       return {message:"service ga dersoal"}
    }
}