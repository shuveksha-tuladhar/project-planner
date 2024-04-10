import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { UserStory } from 'src/userStories/entities/userStory.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserStory, (userStory) => userStory.tasks)
  userStory: UserStory;

  @Column()
  name: string;
  
  @Column({default: "To Do"})
  status: string;


  
  }