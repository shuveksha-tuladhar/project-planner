import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { sendMail } from './mail';
import { resetPasswordTemplate } from './reset-password-template';

@Injectable()
export class MailService {
    async sendPasswordResetEmail(user: User, token:string) {
      sendMail({
        from: "tuladhar.shuveksha@gmail.com",
        to: user.email,
        subject: "Project Planner: Reset Your Password",
        html: resetPasswordTemplate(token, user.id),
      }, () => {
        console.log('password reset email sent')
      });
       
    }
  }