import {
    IsEmail,
    IsOptional,
    IsString,
    IsEnum,
    IsUUID,
    MinLength,
    IsDateString
} from 'class-validator'

export class CreateMemberDto {
    //dto for the user data
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

    //dto for the member data
    // @IsString()
    @IsEnum(['basic','premium','platinium'])
    membership_plan!:string

    @IsDateString()
    join_date!:Date

    @IsDateString()
    membership_expiry!:Date

    @IsEnum(['pending','paid','cancelled'])
    payment_status!:string

    @IsString()
    health_info!:string

    //trainer assignment
    @IsUUID()
    @IsOptional()
    assigned_trainer_id?:string

}