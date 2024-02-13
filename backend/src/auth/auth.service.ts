import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
constructor(private userService: UsersService){}

    async hashPassword(password: string){
        const saltRounds = 10; 
        return await bcrypt.hash(password, saltRounds)
    }

    async signUp(signUpDto) {
        // check if username already exists

        //check if email already exists

        //hash password
        const hashedPassword = await this.hashPassword(signUpDto.password);
        console.log('HASHED PASSWORD:', hashedPassword);
        signUpDto.password = hashedPassword;
        
        // add user to User table
        this.userService.createUser(signUpDto);
        return 'fake token';       
    }
}
