import { Injectable } from '@nestjs/common';
import { UserStory } from './entities/userStory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserStoriesService {
  constructor(
    @InjectRepository(UserStory)
    private userStoriesRepository: Repository<UserStory>,
  ) {}

  async getFeatureUserStories(id: number) {
    return await this.userStoriesRepository.find({
      where: { feature: { id } },
    });
  }
  async createUserStory(name: string, description: string, featureId: number) {
    await this.userStoriesRepository.save({
      name,
      description,
      feature: {
        id: featureId,
      },
    });
    return await this.getFeatureUserStories(featureId);
  }

  async getUserStoryStatusById(id: number) {
    const userStory = await this.userStoriesRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    const tasks = userStory.tasks;
    const taskCount = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done!');
    const completedTasksLength = completedTasks.length;
    console.log('status', completedTasksLength, '/', taskCount);
    return `${completedTasksLength}/${taskCount}`;
  }

  async updateUserStory(
    field: string,
    value: string,
    userId: number,
    userStoryId: number,
  ) {
    const userStoryToUpdate = await this.userStoriesRepository.findOne({
      where: {
        id: userStoryId,
        feature: { project: { user: { id: userId } } },
      },
      relations: ['feature'],
    });

    if (userStoryToUpdate) {
      userStoryToUpdate[field] = value;
      await this.userStoriesRepository.save(userStoryToUpdate);
      return userStoryToUpdate.feature.id;
    } else {
      throw new Error('You cannot edit that user story');
    }
  }

  async deleteUserStory(userStoryId: number, userId: number) {
    const userStory = await this.userStoriesRepository.findOne({
      where: {
        id: userStoryId,
        feature: { project: { user: { id: userId } } },
      },
    });

    if (!userStory) {
      throw new Error('You cannot delete that user story');
    }

    await this.userStoriesRepository.delete(userStoryId);
    return { success: true };
  }
}
