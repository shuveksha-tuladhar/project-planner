import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './auth.controller';


@Injectable()
export class AuthService {
constructor(private userService: UsersService,
    private jwtService: JwtService){}

    async hashPassword(password: string){
        const saltRounds = 10; 
        return await bcrypt.hash(password, saltRounds)
    }

    async createAccessToken(user){
        const payload = { sub: user.userId, username: user.username };
        return await this.jwtService.signAsync(payload);
    }

    async signUp(signUpDto: SignUpDto) {
        // check if username already exists
        const usernameExists = (await this.userService.findUserByUsername(signUpDto.username)).length > 0;
        // console.log('USER Exists:', usernameExists);

        //check if email already exists
        const emailExists = (await this.userService.findUserByEmail(signUpDto.email)).length > 0;
        // console.log('Email Exists:', emailExists);

        if (usernameExists) {
            throw new BadRequestException('Username already exists')
        }

        if (emailExists) {
            throw new BadRequestException('Email already exists')
        }
        
        //hash password
        const hashedPassword = await this.hashPassword(signUpDto.password);
        console.log('HASHED PASSWORD:', hashedPassword);
        signUpDto.password = hashedPassword;
        
        // add user to User table
        const user = await this.userService.createUser(signUpDto);
        // console.log('User', user);
        return this.createAccessToken(user);       
    }
}
