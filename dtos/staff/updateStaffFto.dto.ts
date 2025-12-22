import {
    IsOptional,
    IsString,
    MinLength,
    IsNumber,
    IsDateString,
    IsBoolean,
    IsEnum,
    IsArray
} from 'class-validator'

export class UpdateStaffDto {
    //User Data
    @IsString()
    @IsOptional()
    firstname?:string

    @IsString()
    @IsOptional()
    lastname?:string

    @IsNumber()
    @IsOptional()
    phone?:number

    @IsDateString()
    @IsOptional()
    date_of_birth?:number

    @IsString()
    @IsOptional()
    address?:string

    @IsBoolean()
    @IsOptional()
    is_Active?:boolean

    //Staff Data

    @IsDateString()
    @IsOptional()
    hire_date?:Date

    @IsNumber()
    @IsOptional()
    salary?:number

    @IsEnum(['full-time','part-time','contract'])
    @IsOptional()
    employment_status?:string

    //trainer specific data
    @IsNumber()
    @IsOptional()
    experience?:number

    @IsArray()
    @IsOptional()
    specialization?:string
}