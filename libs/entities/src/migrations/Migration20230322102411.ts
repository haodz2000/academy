import { MigrationWithTimestamps } from './../config/migration-with-timestamps';

export class Migration20230322102411 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('roles', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder),
        tableBuilder.string('name', 255).notNullable().unique();
      tableBuilder.smallint('type').notNullable().unique();
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('roles');
  }
}
