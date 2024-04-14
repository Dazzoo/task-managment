import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from '../dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService
    ) {

    }

    async hashPassword(password) {
        const saltRounds = 10;

        try {
            return await bcrypt.hash(password, saltRounds);
        } catch (err) {
            throw new InternalServerErrorException('Error in password hashing');
        }

    }

    async verifyPassword(request_password, hashed_password) {
        try {
            const result = await bcrypt.compare(request_password, hashed_password);
            return result;
        } catch (err) {
            return false;
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.authRepository.findOne({
            where: {
                email
            }
        })

        return user
    }

    async createUser(createUserDetails: CreateUserDto) {
        const { username, email, password } = createUserDetails

        const hashedPassword = await this.hashPassword(password)
    
        try {
            const user = this.authRepository.create({
                username,
                email,
                password: hashedPassword
            })
            await this.authRepository.save(user)
            return user

        } catch (err) {
            console.log(err.code = "23505")
            if (err) {
                throw new HttpException(err.detail, HttpStatus.BAD_REQUEST)
            } else {
                throw new InternalServerErrorException('Error creating user',)
            }
        }

    }

    async loginUser(loginUserDetails: LoginUserDto) {
        const { email, password } = loginUserDetails

        const user = await this.findUserByEmail(email)

        if (user && (await this.verifyPassword(password, user.password))) {
            const token = await this.jwtService.signAsync({
                username: user.username
            })

            return { token }
        } else {
            throw new UnauthorizedException('Wrong email or password')

        }
        
    }
}
