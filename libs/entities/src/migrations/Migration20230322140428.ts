import { MigrationWithTimestamps } from './../config/migration-with-timestamps';

export class Migration20230322140428 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('stored_files', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder.text('name').notNullable();
      tableBuilder.text('hash').unique().notNullable();
      tableBuilder.text('path').unique().notNullable();
      tableBuilder.text('key').unique().notNullable();
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('stored_files');
  }
}
