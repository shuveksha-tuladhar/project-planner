import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';
import { AuthGuard } from './auth.guard';

export class SignUpDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  password: string;
}

export class LogInDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  password: string;
}

export class AccountDetailDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  value: string;
}

export class Email {
  @IsEmail(undefined, { message: 'Please enter a valid email address' })
  @Transform((params) => sanitizeHtml(params.value))
  email: string;
}

export class NewPasswordDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  newPassword: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  token: string;
}

export class ProjectDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('log-in')
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @UseGuards(AuthGuard)
  @Post('change-account-detail')
  changeAccountDetail(@Body() accountDetailDto: AccountDetailDto) {
    return this.authService.changeAccountDetails(accountDetailDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfileData(@Request() req) {
    return this.authService.getProfileData(req.user.sub);
  }

  @Post('reset-password')
  sendResetPassword(@Body() body: Email) {
    return this.authService.sendResetPasswordEmail(body.email);
  }

  @Post('save-new-password')
  saveNewPassword(@Body() body: NewPasswordDto) {
    return this.authService.saveNewPassword(
      body.newPassword,
      body.id,
      body.token,
    );
  }

  @UseGuards(AuthGuard)
  @Post('delete-user')
  deleteUser(@Request() req) {
    return this.authService.deleteUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('user-projects')
  getUserProjects(@Request() req) {
    const user = this.authService.getProfileData(req.user.sub);
    const projects = this.authService.getUserProjects(req.user.sub)
   return this.authService.getUserProjects(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('create-project')
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    // console.log('ProjectDto', projectDto);
    // console.log('Request', req.user.sub);
    return this.authService.createProject(
      projectDto.name,
      projectDto.description,
      req.user.sub,
    );
  }
}
