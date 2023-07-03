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
import { Course } from '@libs/entities/entities/Course';

@ValidatorConstraint({ name: 'isCourseId', async: true })
@Injectable()
export class IsCourseIdValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>
  ) {}

  async validate(id?: Course['id']): Promise<boolean> {
    if (!isDefined(id)) {
      return true;
    }
    const course = await this.courseRepository.findOne({
      id,
    });
    return !!course;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} không tồn tại.`;
  }
}

export const IsCourseId = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isCourseId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCourseIdValidator,
      async: true,
    });
  };
};
