import { StoredFile } from '@libs/entities/entities/StoredFile';
import { createSlug } from './../../../../apps/server/src/utils/slug';
import { Category } from '@libs/entities/entities/Category';
import { RoleType } from '@libs/constants/entities/Role';
import type { EntityManager, RequiredEntityData } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { Topic } from '../entities/Topic';

const BaseURL = `https://res.cloudinary.com/dhjrftwo1/image/upload/v1680934014/`;
export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const roleRepository = em.getRepository(Role);
    const storedFileRepository = em.getRepository(StoredFile);
    const adminRole = await roleRepository.upsert({
      name: 'Quản lý',
      type: RoleType.Admin,
    });
    await roleRepository.upsert({
      name: 'Người dùng',
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
    const categoryRepository = em.getRepository(Category);
    const devOps = await categoryRepository.upsert({
      name: 'DevOps',
      slug: createSlug('DevOps'),
    });
    const frameworks = await categoryRepository.upsert({
      name: 'Frameworks',
      slug: createSlug('Frameworks'),
    });
    const languages = await categoryRepository.upsert({
      name: 'Languages',
      slug: createSlug('Languages'),
    });
    const techniques = await categoryRepository.upsert({
      name: 'Techniques',
      slug: createSlug('Techniques'),
    });
    const testing = await categoryRepository.upsert({
      name: 'Testing',
      slug: createSlug('Testing'),
    });
    const tooling = await categoryRepository.upsert({
      name: 'Tooling',
      slug: createSlug('Tooling'),
    });
    const topics: Array<{
      topic: RequiredEntityData<Topic>;
      storedFile: RequiredEntityData<StoredFile>;
    }> = [
      {
        topic: {
          name: 'Docker',
          slug: createSlug('Docker'),
          categories: [{ id: techniques.id }],
        },
        storedFile: {
          hash: 'docker-logo_qbx5eu',
          key: 'topics/docker-logo_qbx5eu',
          name: 'docker',
          path: BaseURL + 'topics/docker-logo_qbx5eu',
        },
      },
      {
        topic: {
          name: 'AWS',
          slug: createSlug('AWS'),
          categories: [{ id: devOps.id }],
        },
        storedFile: {
          hash: 'aws-logo_scxhpc',
          key: 'topics/aws-logo_scxhpc',
          name: 'aws',
          path: BaseURL + 'topics/aws-logo_scxhpc',
        },
      },
      {
        topic: {
          name: 'Laravel',
          slug: createSlug('Laravel'),
          categories: [{ id: techniques.id }],
        },
        storedFile: {
          hash: 'laravel-logo_vfnzwy',
          key: 'topics/laravel-logo_vfnzwy',
          name: 'laravel',
          path: BaseURL + 'topics/laravel-logo_vfnzwy',
        },
      },
      {
        topic: {
          name: 'Nuxt',
          slug: createSlug('Nuxt'),
          categories: [{ id: frameworks.id }],
        },
        storedFile: {
          hash: 'nuxtjs-logo_hrqyd8',
          key: 'topics/nuxtjs-logo_hrqyd8',
          name: 'nuxtjs',
          path: BaseURL + 'topics/nuxtjs-logo_hrqyd8',
        },
      },
      {
        topic: {
          name: 'React',
          slug: createSlug('React'),
          categories: [{ id: frameworks.id }],
        },
        storedFile: {
          hash: 'react-logo_dwjlpo',
          key: 'topics/react-logo_izvd4i',
          name: 'react',
          path: BaseURL + 'topics/react-logo_izvd4i',
        },
      },
      {
        topic: {
          name: 'Svelte',
          slug: createSlug('Svelte'),
          categories: [{ id: frameworks.id }],
        },
        storedFile: {
          hash: 'svelte-logo_djot5q',
          key: 'topics/svelte-logo_djot5q',
          name: 'svelte',
          path: BaseURL + 'topics/svelte-logo_djot5q',
        },
      },
      {
        topic: {
          name: 'Tailwind',
          slug: createSlug('Tailwind'),
          categories: [{ id: frameworks.id }],
        },
        storedFile: {
          hash: 'tailwind-logo_py1r2k',
          key: 'topics/tailwind-logo_py1r2k',
          name: 'tailwind',
          path: BaseURL + 'topics/tailwind-logo_py1r2k',
        },
      },
      {
        topic: {
          name: 'Vue',
          slug: createSlug('Vue'),
          categories: [{ id: frameworks.id }],
        },
        storedFile: {
          hash: 'vue-logo_wtkfsv',
          key: 'topics/vue-logo_wtkfsv',
          name: 'vue',
          path: BaseURL + 'topics/vue-logo_wtkfsv',
        },
      },
      {
        topic: {
          name: 'Css',
          slug: createSlug('Css'),
          categories: [{ id: languages.id }],
        },
        storedFile: {
          hash: 'css-logo_f1t4wa',
          key: 'topics/css-logo_f1t4wa',
          name: 'css',
          path: BaseURL + 'topics/css-logo_f1t4wa',
        },
      },
      {
        topic: {
          name: 'Graphql',
          slug: createSlug('Graphql'),
          categories: [{ id: languages.id }],
        },
        storedFile: {
          hash: 'graphql-logo_ieh2xf',
          key: 'topics/graphql-logo_ieh2xf',
          name: 'graphql',
          path: BaseURL + 'topics/graphql-logo_ieh2xf',
        },
      },
      {
        topic: {
          name: 'VueJS',
          slug: createSlug('VueJS'),
          categories: [{ id: languages.id }],
        },
        storedFile: {
          hash: 'vue-logo_wtkfsv',
          key: 'topics/vue-logo_wtkfsv',
          name: 'js',
          path: BaseURL + 'topics/vue-logo_wtkfsv',
        },
      },
      {
        topic: {
          name: 'PHP',
          slug: createSlug('PHP'),
          categories: [{ id: languages.id }],
        },
        storedFile: {
          hash: 'php-logo_bjlyu7',
          key: 'topics/php-logo_bjlyu7',
          name: 'php',
          path: BaseURL + 'topics/php-logo_bjlyu7',
        },
      },
      {
        topic: {
          name: 'Typescript',
          slug: createSlug('Typescript'),
          categories: [{ id: languages.id }],
        },
        storedFile: {
          hash: 'typescript-logo_eie8l8',
          key: 'topics/typescript-logo_eie8l8',
          name: 'typescript',
          path: BaseURL + 'topics/typescript-logo_eie8l8',
        },
      },
      {
        topic: {
          name: 'Authentication',
          slug: createSlug('Authentication'),
          categories: [{ id: techniques.id }],
        },
        storedFile: {
          hash: 'authentication-logo_jhgpz2',
          key: 'topics/authentication-logo_jhgpz2',
          name: 'authentication',
          path: BaseURL + 'topics/authentication-logo_jhgpz2',
        },
      },
      {
        topic: {
          name: 'Queues',
          slug: createSlug('Queues'),
          categories: [{ id: techniques.id }],
        },
        storedFile: {
          hash: 'queues-logo_lbvpd8',
          key: 'topics/queues-logo_lbvpd8',
          name: 'queues',
          path: BaseURL + 'topics/queues-logo_lbvpd8',
        },
      },
      {
        topic: {
          name: 'Security',
          slug: createSlug('Security'),
          categories: [{ id: techniques.id }],
        },
        storedFile: {
          hash: 'security-logo_m4wjpy',
          key: 'topics/security-logo_m4wjpy',
          name: 'security',
          path: BaseURL + 'topics/security-logo_m4wjpy',
        },
      },
      {
        topic: {
          name: 'Cypress',
          slug: createSlug('Cypress'),
          categories: [{ id: testing.id }],
        },
        storedFile: {
          hash: 'cypress-logo_iwzmsf',
          key: 'topics/cypress-logo_iwzmsf',
          name: 'cypress',
          path: BaseURL + 'topics/cypress-logo_iwzmsf',
        },
      },
      {
        topic: {
          name: 'PHPUnit',
          slug: createSlug('PHPUnit'),
          categories: [{ id: testing.id }],
        },
        storedFile: {
          hash: 'phpunit-logo_yksxog',
          key: 'topics/phpunit-logo_yksxog',
          name: 'phpunit',
          path: BaseURL + 'topics/phpunit-logo_yksxog',
        },
      },
      {
        topic: {
          name: 'Git',
          slug: createSlug('Git'),
          categories: [{ id: tooling.id }],
        },
        storedFile: {
          hash: 'git-logo_idsoyv',
          key: 'topics/git-logo_idsoyv',
          name: 'git',
          path: BaseURL + 'topics/git-logo_idsoyv',
        },
      },
      {
        topic: {
          name: 'PHPStorm',
          slug: createSlug('PHPStorm'),
          categories: [{ id: tooling.id }],
        },
        storedFile: {
          hash: 'phpstorm-logo_gwhwoq',
          key: 'topics/phpstorm-logo_gwhwoq',
          name: 'phpstorm',
          path: BaseURL + 'topics/phpstorm-logo_gwhwoq',
        },
      },
      {
        topic: {
          name: 'Redis',
          slug: createSlug('Redis'),
          categories: [{ id: tooling.id }],
        },
        storedFile: {
          hash: 'redis-logo_nrllza',
          key: 'topics/redis-logo_nrllza',
          name: 'redis',
          path: BaseURL + 'topics/redis-logo_nrllza',
        },
      },
      {
        topic: {
          name: 'Visual Studio Code',
          slug: createSlug('Visual Studio Code'),
          categories: [{ id: tooling.id }],
        },
        storedFile: {
          hash: 'visualstudio-logo_kb1xsr',
          key: 'topics/visualstudio-logo_kb1xsr',
          name: 'visualstudio',
          path: BaseURL + 'topics/visualstudio-logo_kb1xsr',
        },
      },
      {
        topic: {
          name: 'Webpack',
          slug: createSlug('Webpack'),
          categories: [{ id: tooling.id }],
        },
        storedFile: {
          hash: 'webpack-logo_gmidfo',
          key: 'topics/webpack-logo_gmidfo',
          name: 'webpack',
          path: BaseURL + 'topics/webpack-logo_gmidfo',
        },
      },
    ];
    for (const topic of topics) {
      const topicLogo = await storedFileRepository.upsert(topic.storedFile);
      const topicRepository = em.getRepository(Topic);
      const dockerTopic = await topicRepository.findOne({
        name: topic.topic.name,
      });
      if (!dockerTopic) {
        const newTopic = topicRepository.create({
          cover_id: topicLogo.id,
          ...topic.topic,
        });
        await topicRepository.persistAndFlush(newTopic);
      }
    }
  }
}
