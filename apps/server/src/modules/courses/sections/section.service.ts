import { ForbiddenError } from '@casl/ability';
import { Section } from '@libs/entities/entities/Section';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dtos/create-section.dto';
import { REQUEST } from '@nestjs/core';
import { AbilityFactory } from '@server/modules/auth/ability/ability.factory';
import { Request } from 'express';
import { IdAction } from '@libs/constants/abilities';
import { Course } from '@libs/entities/entities/Course';
import { DeleteResponse } from '../responses/delete.response';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: EntityRepository<Section>,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async create(data: CreateSectionDto) {
    const course = await this.em
      .getRepository(Course)
      .findOneOrFail({ id: data.course_id });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize create section this course')
      .throwUnlessCan(IdAction.Insert, course);
    const section = this.sectionRepository.create({
      course_id: data.course_id,
      title: data.title,
      description: data.description,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    await this.sectionRepository.persistAndFlush(section);
    return section;
  }

  async delete(id: Section['id']): Promise<DeleteResponse> {
    const section = await this.sectionRepository.findOneOrFail(id, {
      populate: ['course'],
    });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize delete this section')
      .throwUnlessCan(IdAction.Delete, section);
    await this.sectionRepository.removeAndFlush(section);
    return { id };
  }
}
