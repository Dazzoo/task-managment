import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from '../dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>
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

        if (!user) { 
            throw new HttpException('Wrong email or password, please try again', 401)
        }

        const passwordsMatch = await this.verifyPassword(password, user.password)


        if (!passwordsMatch) {
            console.log('fail', passwordsMatch)

            throw new HttpException('Wrong email or password, please try again', 401)
        }

        const userResponse = { ...user };
        delete userResponse.password;
        return userResponse;
        
    }
}
