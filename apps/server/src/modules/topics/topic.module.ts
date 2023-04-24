import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Topic } from '@libs/entities/entities/Topic';
import { Category } from '@libs/entities/entities/Category';
import { Course } from '@libs/entities/entities/Course';

@Module({
  imports: [MikroOrmModule.forFeature([Topic, Category, Course])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
