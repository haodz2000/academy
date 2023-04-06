import { RoleType } from '@libs/constants/entities/Role';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../entities/Role';
import { User } from '../entities/User';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const roleRepository = em.getRepository(Role);
    const adminRole = await roleRepository.upsert({
      name: 'Admin',
      type: RoleType.Admin,
    });
    await roleRepository.upsert({
      name: 'User',
      type: RoleType.User,
    });
    await roleRepository.flush();

    const accountRepository = em.getRepository(User);
    let adminUser = await accountRepository.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (!adminUser) {
      adminUser = accountRepository.create(
        {
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          role_id: adminRole.id,
        },
        {
          persist: false,
        }
      );
      await accountRepository.persistAndFlush(adminUser);
    }
  }
}
