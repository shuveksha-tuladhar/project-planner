import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
constructor(private userService: UsersService){}

    signUp(signUpDto) {
        console.log('SIGN UP DTO', signUpDto)

        // add user to User table
        return 'fake token';       
    }
}
