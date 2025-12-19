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
    return await this.featuresRepository.find({
      where: { project: { id } },
      relations: ['userStories'],
    });
  }
  async createFeature(name: string, description: string, projectId: number) {
    await this.featuresRepository.save({
      name,
      description,
      project: {
        id: projectId,
      },
    });
    return await this.getProjectFeatures(projectId);
  }

  async updateFeature(
    field: string,
    value: string,
    userId: number,
    featureId: number,
  ) {
    const feature = await this.featuresRepository.findOne({
      where: { id: featureId },
      relations: ['project', 'project.user'],
    });

    if (!feature) {
      throw new Error('Feature not found');
    }

    if (feature.project.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    feature[field] = value;
    await this.featuresRepository.save(feature);

    return feature.project.id;
  }

  async deleteFeature(featureId: number, userId: number) {
    const feature = await this.featuresRepository.findOne({
      where: { id: featureId },
      relations: [
        'project',
        'project.user',
        'userStories',
        'userStories.tasks',
      ],
    });

    if (!feature) {
      throw new Error('Feature not found');
    }

    if (feature.project.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    await this.featuresRepository.remove(feature);
    return feature.project.id;
  }
}
