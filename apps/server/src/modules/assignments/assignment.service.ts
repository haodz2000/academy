import { Assignment } from '@libs/entities/entities/Assignment';
import { Lesson } from '@libs/entities/entities/Lesson';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { FilterAssignmentDto } from './dtos/filter-assignemt.dto';
import { FilterQuery } from '@mikro-orm/core';
import { Pagination } from '@libs/utils/responses';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: EntityRepository<Assignment>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: EntityRepository<Lesson>,
    @Inject(REQUEST) private request: Request
  ) {}

  async list(
    options: FilterAssignmentDto
  ): Promise<{ data: Assignment[]; pagination: Pagination }> {
    const limit = 10;
    const where: FilterQuery<Assignment> = {};
    if (options.lesson_id) {
      where.lesson_id = options.lesson_id;
    }
    const [assignments, count] = await this.assignmentRepository.findAndCount(
      where,
      {
        limit: limit,
        offset: (options.page - 1) * limit || 0,
      }
    );
    return {
      data: assignments,
      pagination: {
        limit: limit,
        total: count,
        lastPage: Math.ceil(count / limit),
        page: 1,
      },
    };
  }

  async create(data: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create({
      lesson_id: data.lesson_id,
      title: data.title,
      description: data.description,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    await this.assignmentRepository.persistAndFlush(assignment);
    return assignment;
  }

  async delete() {
    //
  }
}
