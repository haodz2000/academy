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
import { Section } from '@libs/entities/entities/Section';

@ValidatorConstraint({ name: 'isSectionId', async: true })
@Injectable()
export class IsSectionIdValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: EntityRepository<Section>
  ) {}

  async validate(id?: Section['id']): Promise<boolean> {
    if (!isDefined(id)) {
      return true;
    }
    const section = await this.sectionRepository.findOne({
      id,
    });
    return !!section;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} không tồn tại.`;
  }
}

export const IsSectionId = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isSectionId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsSectionIdValidator,
      async: true,
    });
  };
};
