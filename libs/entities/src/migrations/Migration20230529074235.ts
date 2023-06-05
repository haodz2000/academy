import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230529074235 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable(
      'notification_subscriptions',
      (tableBuilder) => {
        this.addSerialPrimaryColumn(tableBuilder);
        tableBuilder
          .integer('user_id')
          .notNullable()
          .index()
          .references('id')
          .inTable('users');
        tableBuilder.text('token').notNullable().unique();
        tableBuilder
          .dateTime('last_active', { useTz: true })
          .notNullable()
          .defaultTo('now()');
        tableBuilder.smallint('status').notNullable().defaultTo(1);
        this.addActorColumns(tableBuilder);
        this.addTimestampColumns(tableBuilder);
        this.addSoftDeleteColumns(tableBuilder);
        this.createUniqueIndex({
          tableName: 'notification_subscriptions',
          column: 'token',
          hasSoftDelete: true,
        });
      }
    );
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('notification_subscriptions');
  }
}
