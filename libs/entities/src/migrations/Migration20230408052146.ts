import { MigrationWithTimestamps } from './../config/migration-with-timestamps';

export class Migration20230408052146 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('topics', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder),
        tableBuilder.string('name', 255).notNullable();
      tableBuilder.string('slug', 255).notNullable().unique();
      tableBuilder
        .uuid('cover_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('stored_files')
        .onUpdate('CASCADE')
        .onDelete('set null');
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('categories', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder),
        tableBuilder.string('name', 255).notNullable();
      tableBuilder.string('slug', 255).notNullable().unique();
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('category_topics', (tableBuilder) => {
      tableBuilder
        .integer('category_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('categories');
      tableBuilder
        .integer('topic_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('topics');
      tableBuilder.primary(['category_id', 'topic_id']);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('category_topics');
    await knex.schema.dropTable('categories');
    await knex.schema.dropTable('topics');
  }
}
