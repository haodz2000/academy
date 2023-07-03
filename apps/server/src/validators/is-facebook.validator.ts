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
import { User } from '@libs/entities/entities/User';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { FilterQuery } from '@mikro-orm/core/typings';

@ValidatorConstraint({ name: 'isFacebook', async: true })
@Injectable()
export class IsFacebookValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async validate(
    facebook: User['facebook'],
    args: ValidationArguments
  ): Promise<boolean> {
    if (isEmpty(facebook)) {
      return true;
    }

    const regexFacebook =
      /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w-]*)?/i;

    if (!regexFacebook.test(facebook)) {
      return false;
    }

    const [selfExclude] = args.constraints;
    const where: FilterQuery<User> = {
      facebook,
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

export const IsFacebook = (
  selfExclude = false,
  validationOptions?: ValidationOptions
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'isFacebook',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [selfExclude],
      options: validationOptions,
      validator: IsFacebookValidator,
      async: true,
    });
  };
};
