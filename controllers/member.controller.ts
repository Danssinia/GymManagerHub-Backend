import { Request , Response } from "express";
import { MemberService } from "../services/member.service";
import { CreateMemberDto } from "../dtos/member/createMemberDto.dto";
import { UpdateMemberDto } from "../dtos/member/updateMemberDto.dto";
import { plainToClass } from "class-transformer";
export class MemberController {
    private memberService:MemberService
    constructor () {
        this.memberService =  new MemberService()
    }
    createMember = async (req:Request,res:Response) => {
      
        //calling the service
        const data= await this.memberService.createMember()
        return res.status(200).json({
            success:true,
            message:data.message
        })
      
    }
}