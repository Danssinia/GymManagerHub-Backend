import {
    IsString,
    IsOptional,
    IsDateString,
    IsBoolean,
    IsEnum,
    IsUUID,
} from 'class-validator'

export class UpdateMemberDto {
     //User Data
        @IsString()
        @IsOptional()
        first_name?:string
    
        @IsString()
        @IsOptional()
        last_name?:string
    
        
        @IsOptional()
        phone?:string
    
        @IsDateString()
        @IsOptional()
        date_of_birth?:Date
    
        @IsString()
        @IsOptional()
        address?:string
    
        @IsBoolean()
        @IsOptional()
        is_Active?:boolean

        //Member Data
        @IsEnum(['basic','premium','platinum'])
        @IsOptional()
        membership_plan?:string

        @IsDateString()
        @IsOptional()
        membership_expiry?:Date

        @IsOptional()
        @IsEnum(['pending','paid','cancelled'])
        payment_status?:string

        @IsOptional()
        @IsString()
        health_info?:string

        //trainer re-assignmnet (optional)
        @IsUUID()
        @IsOptional()
        assigned_trainer_id?:string
}