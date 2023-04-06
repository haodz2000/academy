import { Migration } from '@mikro-orm/migrations';
import { Knex } from 'knex';

export class MigrationWithTimestamps extends Migration {
  getKnexBuilder() {
    return this.ctx ?? this.driver.getConnection('write').getKnex();
  }

  addSerialPrimaryColumn(tableBuilder: Knex.CreateTableBuilder) {
    tableBuilder.increments('id', { primaryKey: true });
  }

  addUuidPrimaryColumn(tableBuilder: Knex.CreateTableBuilder) {
    tableBuilder
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(this.getKnex().raw('gen_random_uuid()'));
  }

  addTimestampColumns(tableBuilder: Knex.CreateTableBuilder): void {
    tableBuilder
      .dateTime('created_at', { useTz: true })
      .nullable()
      .defaultTo('now()');
    tableBuilder
      .dateTime('updated_at', { useTz: true })
      .nullable()
      .defaultTo('now()');
  }

  addSoftDeleteColumns(tableBuilder: Knex.CreateTableBuilder): void {
    tableBuilder.dateTime('deleted_at', { useTz: true }).nullable();
  }

  addActorColumns(tableBuilder: Knex.CreateTableBuilder): void {
    tableBuilder
      .integer('created_by')
      .nullable()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('set null')
      .onUpdate('CASCADE');
    tableBuilder
      .integer('updated_by')
      .nullable()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('set null')
      .onUpdate('CASCADE');
  }

  createUniqueIndex(options: {
    tableName: string;
    column: string;
    hasSoftDelete?: boolean;
    nullable?: boolean;
  }) {
    const knex = this.getKnex();
    let sqlRaw = `CREATE UNIQUE INDEX ${options.tableName}_${options.column}_unique_constraint ON ${options.tableName} (${options.column})`;
    const conditions: string[] = [];
    if (options.hasSoftDelete) {
      conditions.push('deleted_at IS NULL');
    }
    if (options.nullable) {
      conditions.push(`${options.column} IS NOT NULL`);
    }
    if (conditions.length) {
      sqlRaw += ` WHERE ${conditions.join(' and ')}`;
    }
    this.addSql(knex.raw(sqlRaw));
  }

  up(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
