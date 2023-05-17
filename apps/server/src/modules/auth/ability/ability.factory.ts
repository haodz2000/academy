import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { IdAction, IdSubject } from '@libs/constants/abilities';
import { RoleType } from '@libs/constants/entities/Role';
import { User } from '@libs/entities/entities/User';
import { Role } from '@libs/entities/entities/Role';
import { Course } from '@libs/entities/entities/Course';
import { Section } from '@libs/entities/entities/Section';
import { Lesson } from '@libs/entities/entities/Lesson';

export type AppAbility = Ability<
  [IdAction, IdSubject | User | Course | Section | Lesson]
>;

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
        can(IdAction.Delete, IdSubject.Courses, { administrator_id: user.id });
        can(IdAction.Insert, IdSubject.Courses, {
          administrator_id: user.id,
        });
        can(IdAction.Request, IdSubject.Courses, { administrator_id: user.id });
        can(IdAction.Insert, IdSubject.Sections, {
          'course.administrator_id': user.id,
        });
        can(IdAction.Update, IdSubject.Sections, {
          'course.administrator_id': user.id,
        });
        can(IdAction.Delete, IdSubject.Sections, {
          'course.administrator_id': user.id,
        });
        can(IdAction.Update, IdSubject.Sections, {
          created_by: user.id,
        });
        can(IdAction.Delete, IdSubject.Sections, {
          created_by: user.id,
        });
        can(IdAction.Delete, IdSubject.Lessons, {
          created_by: user.id,
        });
        can(IdAction.Update, IdSubject.Lessons, {
          created_by: user.id,
        });
        cannot(IdAction.Update, IdSubject.Courses, ['status']);
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
