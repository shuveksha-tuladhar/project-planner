import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/name')
  async addName(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    console.log(firstName, lastName);
    return await this.appService.addName(firstName, lastName);
  }

  @Get('/hello')
  async getNames() {
    console.log('HERE');
    return this.appService.getNames();
  }

  @Get('/test')
  async getTestUrl() {
    return { status: 200, message: 'Test successful' };
  }
}
