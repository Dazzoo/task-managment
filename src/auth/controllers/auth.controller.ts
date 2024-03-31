import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

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
    
}

