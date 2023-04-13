import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Topic } from '@libs/entities/entities/Topic';
import { Category } from '@libs/entities/entities/Category';
import { CategoryTopic } from '@libs/entities/entities/CategoryTopic';

@Module({
  imports: [MikroOrmModule.forFeature([Topic, Category, CategoryTopic])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
