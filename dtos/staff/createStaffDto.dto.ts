import { 
    IsOptional,
    IsString,
    IsDateString,
    IsEnum,
    IsUUID,
    MinLength,
    IsNumber,
    IsEmail,
    IsArray
} from "class-validator";



export class CreateStaffDto {
    //User Data

    @IsString()
    @MinLength(3)
    first_name!:string

    @IsString()
    @MinLength(3)
    last_name!:string

    @IsEmail()
    email!:string

    @IsString()
    @MinLength(3)
    username!:string

    @IsString()
    @MinLength(8)
    password!:string

    @IsString()
    @IsOptional()
    phone?:string

    @IsDateString()
    @IsOptional()
    date_of_birth?:Date 

    @IsString()
    @IsOptional()
    address?:string

    // @IsUUID()
    // @IsString()
    // role_id!:string

    //Staff Data

    // @IsUUID()
    // @IsString()
    // user_id!:string

    @IsDateString()
    hire_date!:Date

    @IsNumber()
    salary!:number

    @IsEnum(['full-time','part-time','contract'])
    @IsString()
    employment_status!:string

    @IsNumber()
    experience!:number

    @IsString({each:true})
    @IsArray()
    specialization!:string

    

}