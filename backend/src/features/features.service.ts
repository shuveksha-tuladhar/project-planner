import { Injectable } from '@nestjs/common';
import { Feature } from './entities/features.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FeatureService {
    constructor(
        @InjectRepository(Feature)
        private featuresRepository: Repository<Feature>,
      ) {}

      async getProjectFeatures(id: number) {
        return await this.featuresRepository.find({ where: { project: { id } } });
      }
      async createFeature(name: string, description: string, projectId: number){
         await this.featuresRepository.save({
          name,
          description,
          project: {
            id: projectId,
          },
        });
        return await this.getProjectFeatures(projectId);
      }
}