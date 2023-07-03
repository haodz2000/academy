import {
  isEmpty,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { FilterQuery } from '@mikro-orm/core/typings';
import { User } from '@libs/entities/entities/User';

@ValidatorConstraint({ name: 'isPhoneNumber', async: true })
@Injectable()
export class IsPhoneNumberValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>
  ) {}

  async validate(
    phone: User['phone'],
    args: ValidationArguments
  ): Promise<boolean> {
    if (isEmpty(phone)) return true;
    let phoneSlice: string;

    if (phone.length === 11) {
      phoneSlice = '0' + phone.slice(2);
    } else {
      phoneSlice = phone;
    }

    const regexPhoneNumber = /(84|[35789])+([0-9]{8})\b/g;
    if (!regexPhoneNumber.test(phone)) {
      return false;
    }

    const [selfExclude] = args.constraints;
    const where: FilterQuery<User> = {
      phone: phoneSlice,
    };
    if (selfExclude) {
      where.id = { $ne: (args.object as any)._requestContext.params.id };
    }

    const existUser = await this.userRepository.findOne(where);

    return !existUser;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} không hợp lệ.`;
  }
}

export const IsPhoneNumber = (
  selfExclude = false,
  validationOptions?: ValidationOptions
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [selfExclude],
      options: validationOptions,
      validator: IsPhoneNumberValidator,
      async: true,
    });
  };
};
