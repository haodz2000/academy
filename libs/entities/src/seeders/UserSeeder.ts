import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities/User';
import { StoredFile } from '../entities/StoredFile';
import { Role } from '../entities/Role';
import { RoleType } from '@libs/constants/entities/Role';

const BaseURL = `https://res.cloudinary.com/dhjrftwo1/image/upload/v1680934014/`;
export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const userRepositoty = em.getRepository(User);
    const storedFileRepository = em.getRepository(StoredFile);
    const roleReposioty = em.getRepository(Role);
    const avatars: Partial<StoredFile>[] = [
      {
        hash: 'avatar1_djt7hk',
        key: 'avatars/avatar1_djt7hk',
        name: 'avatar1_djt7hk',
        path: BaseURL + 'avatars/avatar1_djt7hk',
      },
      {
        hash: 'avatar6_qzeyrs',
        key: 'avatars/avatar6_qzeyrs',
        name: 'avatar6_qzeyrs',
        path: BaseURL + 'avatars/avatar6_qzeyrs',
      },
      {
        hash: 'avatar4_h6y9sl',
        key: 'avatars/avatar4_h6y9sl',
        name: 'avatar4_h6y9sl',
        path: BaseURL + 'avatars/avatar4_h6y9sl',
      },
      {
        hash: 'avatar5_szivyy',
        key: 'avatars/avatar5_szivyy',
        name: 'avatar5_szivyy',
        path: BaseURL + 'avatars/avatar5_szivyy',
      },
      {
        hash: 'avatar2_z9lukh',
        key: 'avatars/avatar2_z9lukh',
        name: 'avatar2_z9lukh',
        path: BaseURL + 'avatars/avatar2_z9lukh',
      },
      {
        hash: 'avatar3_tpsoan',
        key: 'avatars/avatar3_tpsoan',
        name: 'avatar3_tpsoan',
        path: BaseURL + 'avatars/avatar3_tpsoan',
      },
      {
        hash: 'avatar7_supqcp',
        key: 'avatars/avatar7_supqcp',
        name: 'avatar7_supqcp',
        path: BaseURL + 'avatars/avatar7_supqcp',
      },
      {
        hash: 'avatar8_brintx',
        key: 'avatars/avatar8_brintx',
        name: 'avatar8_brintx',
        path: BaseURL + 'avatars/avatar8_brintx',
      },
      {
        hash: 'avatar13_cessq4',
        key: 'avatars/avatar13_cessq4',
        name: 'avatar13_cessq4',
        path: BaseURL + 'avatars/avatar13_cessq4',
      },
      {
        hash: 'avatar9_tinhw8',
        key: 'avatars/avatar9_tinhw8',
        name: 'avatar9_tinhw8',
        path: BaseURL + 'avatars/avatar9_tinhw8',
      },
      {
        hash: 'avatar14_qrnd4h',
        key: 'avatars/avatar14_qrnd4h',
        name: 'avatar14_qrnd4h',
        path: BaseURL + 'avatars/avatar14_qrnd4h',
      },
      {
        hash: 'avatar13_ixpqz7',
        key: 'avatars/avatar13_ixpqz7',
        name: 'avatar13_ixpqz7',
        path: BaseURL + 'avatars/avatar13_ixpqz7',
      },
      {
        hash: 'avatar15_wtv5b1',
        key: 'avatars/avatar15_wtv5b1',
        name: 'avatar15_wtv5b1',
        path: BaseURL + 'avatars/avatar15_wtv5b1',
      },
      {
        hash: 'avatar12_tndyaq',
        key: 'avatars/avatar12_tndyaq',
        name: 'avatar12_tndyaq',
        path: BaseURL + 'avatars/avatar12_tndyaq',
      },
      {
        hash: 'avatar17_nkkkqb',
        key: 'avatars/avatar17_nkkkqb',
        name: 'avatar17_nkkkqb',
        path: BaseURL + 'avatars/avatar17_nkkkqb',
      },
      {
        hash: 'avatar16_vnl2he',
        key: 'avatars/avatar16_vnl2he',
        name: 'security',
        path: BaseURL + 'avatars/avatar16_vnl2he',
      },
    ];
    const userRole = await roleReposioty.findOneOrFail({ type: RoleType.User });
    const listAvatar = await storedFileRepository.upsertMany(avatars);
    for (let i = 0; i < 50; i++) {
      const user = userRepositoty.create({
        name: 'Default User ' + i,
        email: 'default' + i + '@gmail.com',
        role_id: userRole.id,
        avatar_id: listAvatar[i % 13].id,
      });
      await userRepositoty.persistAndFlush(user);
    }
  }
}
