import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Assignment } from '@libs/entities/entities/Assignment';
import { Lesson } from '@libs/entities/entities/Lesson';
import { AbilityModule } from '../auth/ability/ability.module';

@Module({
  imports: [MikroOrmModule.forFeature([Assignment, Lesson]), AbilityModule],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
