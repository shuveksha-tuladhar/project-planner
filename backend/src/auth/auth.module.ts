import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { FeatureModule } from 'src/features/features.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    ProjectsModule,
    FeatureModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
