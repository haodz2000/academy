import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule as OrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [
    OrmModule.forRoot(config),
    OrmModule.forFeature({
      entities: [],
    }),
  ],
  exports: [OrmModule],
})
export class MikroOrmModule {
  private readonly logger = new Logger(MikroOrmModule.name);

  async onModuleInit() {
    this.logger.log('Starting migration...');
    const orm = await MikroORM.init(config);

    const migrator = orm.getMigrator();
    await migrator.up();

    await orm.close(true);
    this.logger.log('Migration ended.');
  }
}
