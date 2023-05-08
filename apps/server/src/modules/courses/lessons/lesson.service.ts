import { ForbiddenError } from '@casl/ability';
import { Request } from 'express';
import { Lesson } from '@libs/entities/entities/Lesson';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AbilityFactory } from '@server/modules/auth/ability/ability.factory';
import { Section } from '@libs/entities/entities/Section';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { IdAction } from '@libs/constants/abilities';
import { DeleteResponse } from '../responses/delete.response';
import { UpdateLessonDto } from './dtos/update-lesson.dto';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: EntityRepository<Lesson>,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async create(data: CreateLessonDto): Promise<Lesson> {
    const section = await this.em
      .getRepository(Section)
      .findOneOrFail({ id: data.section_id }, { populate: ['course'] });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize create lesson this course')
      .throwUnlessCan(IdAction.Insert, section);
    const lesson = this.lessonRepository.create({
      section_id: data.section_id,
      title: data.title,
      description: data.description,
      link: data.link,
      time: data.time,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    await this.lessonRepository.persistAndFlush(lesson);
    return lesson;
  }

  async update(id: number, data: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneOrFail({
      id,
      created_by: this.request.user.id,
    });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize create lesson this course')
      .throwUnlessCan(IdAction.Insert, lesson);
    wrap(lesson).assign({
      ...data,
    });
    await this.lessonRepository.persistAndFlush(lesson);
    return lesson;
  }

  async delete(id: Lesson['id']): Promise<DeleteResponse> {
    const lesson = await this.lessonRepository.findOneOrFail(id, {
      populate: ['section.course'],
    });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize delete this section')
      .throwUnlessCan(IdAction.Delete, lesson);
    await this.lessonRepository.removeAndFlush(lesson);
    return { id };
  }
}
