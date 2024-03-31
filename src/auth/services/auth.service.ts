import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt'

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
}
