import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  
constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}
  
  async addNames(name: string) {
    // save the name into the name table of the database
    const addName = await this.namesRepository.save({name});
    console.log('add names:', addName)
    return await this.getNames();
  }
  async getNames() {
    //get all names from database
    const names = await this.namesRepository.find();
    console.log('names:', names)
    return names;
  }
}
