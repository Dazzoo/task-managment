import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator"


export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { 
        message: "Minimum eight characters, at least one letter and one number"
    })
    password: string
}