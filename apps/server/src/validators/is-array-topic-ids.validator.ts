import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Topic } from '@libs/entities/entities/Topic';
import { EntityRepository } from '@mikro-orm/postgresql';
import { uniq } from 'lodash';

@ValidatorConstraint({ name: 'isArrayTopicIds', async: true })
@Injectable()
export class IsArrayTopicIdsValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: EntityRepository<Topic>
  ) {}

  async validate(ids: number[]): Promise<boolean> {
    console.log(typeof ids);
    const uniqueIds = uniq(ids);
    const topics = await this.topicRepository.find({ id: { $in: uniqueIds } });
    return uniqueIds.length === topics.length;
  }

  defaultMessage(): string {
    return `Topic ids are not valid!`;
  }
}

export const IsArrayTopicIds = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isArrayTopicIds',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsArrayTopicIdsValidator,
      async: true,
    });
  };
};
