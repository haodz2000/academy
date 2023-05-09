import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Discuss } from '@libs/entities/entities/Discuss';
import { Course } from '@libs/entities/entities/Course';
import { AbilityModule } from '../auth/ability/ability.module';

@Module({
  imports: [MikroOrmModule.forFeature([Discuss, Course]), AbilityModule],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class DiscussionModule {}
