import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountDetailDto, LogInDto, SignUpDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user) {
    const payload = { sub: user.userId, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async signUp(signUpDto: SignUpDto) {
    // check if username already exists
    const usernameExists = (
      await this.userService.findUserByUsername(signUpDto.username)
    )?.username;
    // console.log('USER Exists:', usernameExists);

    //check if email already exists
    const emailExists = (
      await this.userService.findUserByEmail(signUpDto.email)
    )?.email;
    // console.log('Email Exists:', emailExists);

    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }

    if (emailExists) {
      throw new BadRequestException('Email already exists');
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

  async verifyPassword(enteredPassword: string, existingPassword: string) {
    return await bcrypt.compare(enteredPassword, existingPassword);
  }

  async logIn(logInDto: LogInDto) {
    //check that user exists
    const user = await this.userService.findUserByUsername(logInDto.username);
    // console.log("USER:", user)

    //if user doesn't exits, throw unauthorized error
    if (!user) {
      throw new UnauthorizedException("username doesn't exists");
    }

    //verify that passwords match
    const passwordMatch = await this.verifyPassword(
      logInDto.password,
      user.password,
    );
    console.log('Password Match', passwordMatch);

    //if the password don't match, throw unauthorized error
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    //create and return an access token
    return await this.createAccessToken(user);
  }

  async changeAccountDetails(accountDetailDto: AccountDetailDto) {
    // find user with username
    const user = await this.userService.findUserByUsername(
      accountDetailDto.username,
    );
    //update field including hash password
    if (accountDetailDto.field === 'password') {
      const plainTextPassword = accountDetailDto.value;
      const hashedPassword = await this.hashPassword(plainTextPassword);
      user[accountDetailDto.field] = hashedPassword;
    } else {
        user[accountDetailDto.field] = accountDetailDto.value;
    }
    console.log("User dto:",user );
    //save the user in database
    return await this.userService.createUser(user);
  }

  async getProfileData(username: string) {
    const user = await this.userService.findUserByUsername(username);
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    };
  }
}
