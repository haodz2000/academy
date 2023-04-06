import { MigrationWithTimestamps } from './../config/migration-with-timestamps';

export class Migration20230322141055 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('users', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder.string('name', 255).notNullable();
      tableBuilder.string('google_id', 255).nullable();
      tableBuilder.string('email', 255).unique().notNullable().comment('gmail');
      tableBuilder
        .integer('role_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('roles');
      tableBuilder
        .uuid('avatar_id')
        .index()
        .nullable()
        .references('id')
        .inTable('stored_files');
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
    this.createUniqueIndex({
      tableName: 'users',
      column: 'email',
      hasSoftDelete: true,
    });
    this.createUniqueIndex({
      tableName: 'users',
      column: 'google_id',
      hasSoftDelete: true,
    });
    await knex.schema.alterTable('roles', (tableBuilder) => {
      this.addActorColumns(tableBuilder);
    });
    await knex.schema.alterTable('stored_files', (tableBuilder) => {
      this.addActorColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.alterTable('stored_files', (tableBuilder) => {
      tableBuilder.dropColumn('created_by');
      tableBuilder.dropColumn('updated_by');
    });
    await knex.schema.alterTable('roles', (tableBuilder) => {
      tableBuilder.dropColumn('created_by');
      tableBuilder.dropColumn('updated_by');
    });
    await knex.schema.dropTable('users');
  }
}
