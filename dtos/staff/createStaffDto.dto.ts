import { 
    IsOptional,
    IsString,
    IsDateString,
    IsEnum,
    IsUUID,
    MinLength,
    IsNumber
} from "class-validator";



export class CreateStaffDto {
    @IsUUID()
    @IsString()
    staff_id!:string

    @IsUUID()
    @IsString()
    user_id!:string

    @IsDateString()
    hire_date!:string

    @IsEnum(['full_time','part_time','contract'])
    @IsString()
    employment_status!:string

    @IsNumber()
    experience!:number

    @IsString()
    specialization!:string
}