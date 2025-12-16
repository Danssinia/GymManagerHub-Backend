import {
    IsEmail,
    IsString,
    IsUUID,
    MinLength,
    IsOptional,
    isDateString,
    IsDateString
} from 'class-validator'

export class CreateUserDto {
    // @IsUUID()
    // user_id!:string

    @IsString()
    @MinLength(3)
    first_name!: string;

    @IsString()
    @MinLength(3)
    last_name!: string

    @IsEmail()
    email!: string

    @IsString()
    @MinLength(3)
    username!: string

    @IsString()
    @MinLength(8)
    password!: string

    @IsString()
    @IsOptional()
    phone?: string

    @IsDateString()
    @IsOptional()
    date_of_birth?: string

    @IsString()
    @IsOptional()
    address?: string

    // @IsString()
    // @IsOptional()
    // @MinLength(500)
    // profile_picture?:string

    @IsUUID()
    role_id!: string
}