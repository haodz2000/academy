import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { Configuration } from '@mikro-orm/core/utils/Configuration';
import { User } from '@libs/entities/entities/User';
import { Role } from '@libs/entities/entities/Role';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import * as dotenv from 'dotenv';
import { Topic } from '@libs/entities/entities/Topic';
import { Category } from '@libs/entities/entities/Category';
import { CategoryTopic } from '@libs/entities/entities/CategoryTopic';
import { Course } from '@libs/entities/entities/Course';
import { Section } from '@libs/entities/entities/Section';
import { Lesson } from '@libs/entities/entities/Lesson';
import { CourseTopic } from '@libs/entities/entities/CourseTopic';
import { LearningRequest } from '@libs/entities/entities/LearningRequest';
import { TeachingRequest } from '@libs/entities/entities/TeachingRequest';
import { CourseStudent } from '@libs/entities/entities/CourseStudent';
import { CourseTeacher } from '@libs/entities/entities/CourseTeacher';

dotenv.config();

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [
    User,
    Role,
    StoredFile,
    Topic,
    Category,
    CategoryTopic,
    Course,
    Section,
    Lesson,
    CourseTopic,
    LearningRequest,
    TeachingRequest,
    CourseStudent,
    CourseTeacher,
  ],
  dbName: process.env.DB_NAME,
  type: process.env.DB_TYPE as keyof typeof Configuration.PLATFORMS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  highlighter: new SqlHighlighter(),
  debug: process.env.NODE_ENV === 'development',
  logger: logger.log.bind(logger),
  allowGlobalContext: true,
  migrations: {
    path: 'dist/libs/entities/migrations',
    pathTs: 'libs/entities/src/migrations',
    tableName: 'mikro_migrations',
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: false, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  seeder: {
    path: 'dist/libs/entities/seeders', // path to the folder with seeders
    pathTs: 'libs/entities/src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;
