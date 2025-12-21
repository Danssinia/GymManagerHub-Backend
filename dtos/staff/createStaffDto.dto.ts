import { 
    IsOptional,
    IsString,
    IsDateString,
    IsEnum,
    IsUUID,
    MinLength,
    IsNumber,
    IsEmail
} from "class-validator";



export class CreateStaffDto {
    //the user_id might be commented (i will check it)
    @IsUUID()
    @IsString()
    user_id!:string

    @IsString()
    @MinLength(3)
    first_name!:string

    @IsString()
    @MinLength(3)
    last_name!:string

    @IsEmail()
    @IsString()
    email!:string

    @IsString()
    username!:string

    @IsString()
    @MinLength(8)
    password!:string

    @IsString()
    @MinLength(10)
    @IsOptional()
    phone?:string

    @IsDateString()
    @IsOptional()
    date_of_birth?:Date 

    @IsString()
    @IsOptional()
    address?:string

    @IsUUID()
    @IsString()
    role_id!:string



    //here below the need to be checked from the staff table
    @IsUUID()
    @IsString()
    staff_id!:string

    // @IsUUID()
    // @IsString()
    // user_id!:string

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