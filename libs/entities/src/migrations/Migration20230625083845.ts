import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230625083845 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('transactions', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('from_wallet_id')
        .index()
        .nullable()
        .references('id')
        .inTable('wallets');
      tableBuilder
        .integer('to_wallet_id')
        .notNullable()
        .index()
        .nullable()
        .references('id')
        .inTable('wallets');
      tableBuilder.smallint('type').unsigned().notNullable().index();
      tableBuilder.smallint('status').unsigned().notNullable().index();
      tableBuilder.integer('amount').unsigned().notNullable().index();
      tableBuilder.text('message').after('amount').notNullable().index();
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('withdraw_requests', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder.integer('amount').unsigned().notNullable().index();
      tableBuilder
        .integer('requester_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder
        .integer('acceptor_id')
        .nullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder
        .uuid('transaction_id')
        .nullable()
        .index()
        .references('id')
        .inTable('transactions');
      tableBuilder
        .smallint('status')
        .defaultTo(1)
        .unsigned()
        .notNullable()
        .index();
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('withdraw_requests');
    await knex.schema.dropTable('transactions');
  }
}
