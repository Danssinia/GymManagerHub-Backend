import {
    IsOptional,
    IsString,
    IsBoolean,
    IsDateString
} from 'class-validator'

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    first_name?:string

    @IsString()
    @IsOptional()
    last_name?:string

    @IsString()
    @IsOptional()
    phone?:string

    @IsDateString()
    @IsOptional()
    date_of_birth?:Date

    @IsString()
    @IsOptional()
    address?:string

    // @IsString()
    // @IsOptional()
    // profile_picture?:string

    @IsBoolean()
    @IsOptional()
    is_Active?:boolean
}