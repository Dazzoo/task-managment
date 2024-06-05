import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { LoginUserDto } from '../dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {

    }

    @Post('signup')
    async signUp(
        @Body() signUpDetails: CreateUserDto
        ) {
        await this.authService.createUser(signUpDetails)

        throw new HttpException({
            status: HttpStatus.CREATED,
            message: 'User was created'
        }, HttpStatus.CREATED);
    }

    @Post('signin')
    async signIn(
        @Body() signInDetails: LoginUserDto,
        @Res() res: Response
    ) {
        const userData = await this.authService.loginUser(signInDetails)
        res.cookie('token', userData.token, { httpOnly: true });

        throw new HttpException({
            status: HttpStatus.OK,
            message: 'Success',
            data: userData
        }, HttpStatus.OK)
    }
    
}

