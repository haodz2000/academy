import { FilterQuery } from '@mikro-orm/core';
import { Course } from '@libs/entities/entities/Course';
import { RatingCourse } from '@libs/entities/entities/RatingCourse';
import { User } from '@libs/entities/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RateDto } from './dtos/rate.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RateQueryDto } from './dtos/rate-query.dto';
import { Pagination } from '@libs/utils/responses';
import { AverageResponse } from './responses/average.response';

@Injectable()
export class RatingCoursesService {
  constructor(
    @InjectRepository(RatingCourse)
    private readonly ratingCourseRepository: EntityRepository<RatingCourse>,
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject(REQUEST) private request: Request
  ) {}

  async list(option: RateQueryDto): Promise<{
    data: RatingCourse[];
    pagination: Pagination;
  }> {
    const limit = option.limit || 15;
    const page = option.page || 1;
    const where: FilterQuery<RatingCourse> = {};
    where.course_id = option.course_id;
    const count = await this.ratingCourseRepository.count(where);
    const ratingCourses = await this.ratingCourseRepository.find(where, {
      populate: ['user.avatar'],
      limit,
      offset: (page - 1) * limit,
      orderBy: [{ point: 'DESC' }, { created_at: 'DESC' }],
    });
    return {
      data: ratingCourses,
      pagination: {
        limit: limit,
        total: count,
        lastPage: Math.ceil(count / limit),
        page: page,
      },
    };
  }

  async getPoint(id: number): Promise<AverageResponse> {
    const [points, total] = await this.ratingCourseRepository.findAndCount(
      {
        course_id: id,
      },
      {
        fields: ['point'],
      }
    );
    const totalPoint = points.reduce((a, b) => {
      return a + b.point;
    }, 0);
    return { rate_point: Math.round(totalPoint / total) };
  }

  async rate(data: RateDto) {
    let ratingCourse = await this.ratingCourseRepository.findOne({
      course_id: data.course_id,
      user_id: this.request.user.id,
    });
    if (ratingCourse) {
      throw new BadRequestException('Bạn đã đánh giá khóa học này rồi');
    } else {
      ratingCourse = this.ratingCourseRepository.create({
        course_id: data.course_id,
        point: data.point,
        user_id: this.request.user.id,
        comment: data.comment,
      });
      await this.ratingCourseRepository.persistAndFlush(ratingCourse);
    }
    return ratingCourse;
  }
}
