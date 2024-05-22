import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { UserStory } from 'src/userStories/entities/userStory.entity';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.features)
  project: Project;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({default: "To Do"})
  status: string;

  @OneToMany(() => UserStory , (userStory) => userStory.feature)
  userStories: UserStory[];

  }