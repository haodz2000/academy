import { FilterQuery } from '@mikro-orm/core';
import { Course } from '@libs/entities/entities/Course';
import { Discuss } from '@libs/entities/entities/Discuss';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateDiscussionDto } from './dtos/create-discussion.dto';
import { FilterDiscussionDto } from './dtos/filter-discussion.dto';
import { Pagination } from '@libs/utils/responses';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discuss)
    private readonly discussRepository: EntityRepository<Discuss>,
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    private readonly em: EntityManager,
    @Inject(REQUEST) private request: Request
  ) {}

  async list(options: FilterDiscussionDto): Promise<{
    data: Discuss[];
    pagination: Pagination;
  }> {
    const limit = 10;
    const where: FilterQuery<Discuss> = {};
    if (options.lesson_id) {
      where.lesson_id = options.lesson_id;
    }
    const [discussions, count] = await this.discussRepository.findAndCount(
      where,
      {
        populate: ['creator.avatar'],
        limit: limit,
        offset: (options.page - 1) * limit || 0,
        orderBy: {
          created_at: 'DESC',
        },
      }
    );
    return {
      data: discussions,
      pagination: {
        limit: limit,
        total: count,
        lastPage: Math.ceil(count / limit),
        page: 1,
      },
    };
  }

  async create(data: CreateDiscussionDto): Promise<Discuss> {
    const discussion = this.discussRepository.create({
      lesson_id: data.lesson_id,
      description: data.description,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    await this.discussRepository.persistAndFlush(discussion);
    return discussion;
  }
}
