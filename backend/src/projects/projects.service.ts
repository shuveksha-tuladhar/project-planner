import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
      ) {}

      async getUserProjects(id: number) {
        return await this.projectsRepository.find({ where: { user: { id } } });
      }
      async createProject(name: string, description, userId){
         await this.projectsRepository.save({
          name,
          description,
          user: {
            id: userId,
          },
        });
        return await this.getUserProjects(userId);
      }
}