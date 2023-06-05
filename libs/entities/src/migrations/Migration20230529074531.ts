import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230529074531 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('notifications', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('user_id')
        .nullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder.jsonb('payload').notNullable().defaultTo('{}');
      tableBuilder.jsonb('fcm_message').notNullable().defaultTo('{}');
      tableBuilder.smallint('type').notNullable();
      tableBuilder.smallint('status').notNullable().defaultTo(0);
      tableBuilder.smallint('read').notNullable().defaultTo(0);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    return knex.schema.dropTable('notifications');
  }
}
