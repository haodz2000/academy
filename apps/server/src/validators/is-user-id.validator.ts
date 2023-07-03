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
import { User } from '@libs/entities/entities/User';

@ValidatorConstraint({ name: 'isAccountId', async: true })
@Injectable()
export class IsUserIdValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly accountRepository: EntityRepository<User>
  ) {}

  async validate(id?: User['id']): Promise<boolean> {
    if (!isDefined(id)) {
      return true;
    }
    const account = await this.accountRepository.findOne({
      id,
    });
    return !!account;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} không tồn tại.`;
  }
}

export const IsUserId = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isAccountId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsUserIdValidator,
      async: true,
    });
  };
};
