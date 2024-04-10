import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AccountDetailDto,
  Email,
  LogInDto,
  NewPasswordDto,
  ProjectDto,
  SignUpDto,
} from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { FeatureService } from 'src/features/features.service';
import { UserStoriesService } from 'src/userStories/userStory.service';
import { TasksService } from 'src/tasks/tasks.service';
import { UserStory } from 'src/userStories/entities/userStory.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private projectService: ProjectsService,
    private featuresService: FeatureService,
    private userStoriesService: UserStoriesService,
    private tasksService: TasksService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user: User, secret?: string) {
    const payload = { sub: user.id };

    if (secret) {
      return await this.jwtService.signAsync(payload, {
        secret: user.password,
        expiresIn: '10m',
      });
    } else {
      return await this.jwtService.signAsync(payload);
    }
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
    // console.log("User dto:",user );
    const updatedUser = await this.userService.createUser(user);
    return {
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    };

    //save the user in database
    return await this.userService.createUser(user);
  }

  async getProfileData(id: number) {
    const user = await this.userService.findUserById(id);
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    };
  }
  s;
  async sendResetPasswordEmail(email: string) {
    const user = await this.userService.findUserByEmail(email);

    if (user === null) {
      throw new BadRequestException('Email not found');
    }
    //create a JWT with the user's current hashed password as secret
    const token = await this.createAccessToken(user, user.password);

    //send an email to user with a link to a reset password page on the frontend with the JWT and userId as params
    return await this.mailService.sendPasswordResetEmail(user, token);
  }

  async saveNewPassword(newPassword: string, id: number, token: string) {
    //get the user associated with that id
    const user = await this.userService.findUserById(id);

    // verify token using the user we just looked up hashed password
    await this.jwtService
      .verifyAsync(token, {
        secret: user.password,
      })
      .catch(() => {
        throw new UnauthorizedException('Token is invalid');
      })
      .then(async () => {
        const hashedPassword = await this.hashPassword(newPassword);
        user.password = hashedPassword;
        return await this.userService.createUser(user);
      });
  }

  async deleteUser(id: number) {
    return await this.userService.deleteUser(id);
  }

  async createProject(name: string, description: string, userId: number) {
    return await this.projectService.createProject(name, description, userId);
  }

  async getUserProjects(userId: number) {
    const user = await this.getProfileData(userId);
    const projects = await this.projectService.getUserProjects(userId);
    return {
      user,
      projects,
    };
  }

  async getProject(userId: number, id: number) {
    const projects = await this.projectService.getUserProjects(userId);
    return projects.filter((project) => project.id === id);
  }

  async createFeature(
    name: string,
    description: string,
    userId: number,
    projectId: number,
  ) {
    const projects = await this.projectService.getUserProjects(userId);
    // console.log('projectid', projectId)
    const project = projects.find((project) => project.id === projectId);
    // console.log('project exists', project)

    if (project.id) {
      return await this.featuresService.createFeature(
        name,
        description,
        projectId,
      );
    } else {
      throw new UnauthorizedException('project not found');
    }
  }

  async createUserStory(
    name: string,
    description: string,
    userId: number,
    projectId: number,
    featureId: number,
  ) {
    const projects = await this.projectService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);
    const features = project.features;
    const feature = features.find((feature) => feature.id === featureId);

    console.log('Feature', feature)

    if (feature.id) {
      return await this.userStoriesService.createUserStory(
        name,
        description,
        featureId,
      );
    } else {
      throw new UnauthorizedException('feature not found');
    }
  }

  async createTask(
    name: string,
    userId: number,
    projectId: number,
    featureId: number,
    userStoryId: number
  ) {
    const projects = await this.projectService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);
    const features = project.features;
    const feature = features.find((feature) => feature.id === featureId);
    const userStories = feature.userStories;
    const userStory = userStories.find((userStory) => userStory.id === userStoryId)

    console.log('userStory', userStory)

    if (userStory.id) {
      return await this.tasksService.createTask( name, userStoryId);
    } else {
      throw new UnauthorizedException('user story not found');
    }
  }
}
