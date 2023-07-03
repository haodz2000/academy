import {
  isDefined,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Lesson } from '@libs/entities/entities/Lesson';

@ValidatorConstraint({ name: 'isLessonId', async: true })
@Injectable()
export class IsLessonIdValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: EntityRepository<Lesson>
  ) {}

  async validate(id?: Lesson['id']): Promise<boolean> {
    if (!isDefined(id)) {
      return true;
    }
    const lesson = await this.lessonRepository.findOne({
      id,
    });
    return !!lesson;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} không tồn tại.`;
  }
}

export const IsLessonId = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isLessonId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsLessonIdValidator,
      async: true,
    });
  };
};
