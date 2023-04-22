import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { IdAction, IdSubject } from '@libs/constants/abilities';
import { RoleType } from '@libs/constants/entities/Role';
import { User } from '@libs/entities/entities/User';
import { Role } from '@libs/entities/entities/Role';
import { Course } from '@libs/entities/entities/Course';

export type AppAbility = Ability<[IdAction, IdSubject | User | Course]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>
    );
    switch (user.role.type) {
      case RoleType.Admin: {
        can(IdAction.Manage, IdSubject.All);
        break;
      }
      case RoleType.User: {
        can(IdAction.Read, IdSubject.All);
        can(IdAction.Update, IdSubject.Users, { id: user.id });
        can(IdAction.Update, IdSubject.Courses, { administrator_id: user.id });
        cannot(IdAction.Update, IdSubject.Courses, ['status']);
        // can(IdAction.Insert, IdSubject.Transactions);
        // can(IdAction.Insert, IdSubject.WithdrawRequests);
        // can(IdAction.Insert, IdSubject.Services);
        // can(IdAction.Update, IdSubject.Services, {
        //   administrator_id: account.id,
        // });
        // cannot(IdAction.Update, IdSubject.Accounts, [
        //   'status',
        //   'email',
        //   'name',
        //   'gender',
        // ]);
        break;
      }
      default: {
        cannot(IdAction.Manage, IdSubject.All);
        break;
      }
    }
    return build({
      detectSubjectType: (item: unknown) => {
        switch (item.constructor?.name) {
          case Role.name:
            return IdSubject.Roles;
        }
        return IdSubject.All;
      },
    });
  }
}
