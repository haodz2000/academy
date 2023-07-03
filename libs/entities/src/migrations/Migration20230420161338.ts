import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230420161338 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('courses', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder.string('name', 255).notNullable();
      tableBuilder.string('slug', 255).notNullable().unique();
      tableBuilder.text('description').nullable();
      tableBuilder.smallint('status').defaultTo(1).notNullable();
      tableBuilder.smallint('type').defaultTo(1).notNullable();
      tableBuilder.smallint('mode').defaultTo(1).notNullable();
      tableBuilder
        .integer('administrator_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder
        .uuid('cover_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('stored_files');
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('sections', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder.string('title', 255).notNullable();
      tableBuilder.string('description').nullable();
      tableBuilder.integer('order').nullable().defaultTo(0);
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses')
        .onUpdate('CASCADE');
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
    await knex.schema.createTable('course_prices', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('course_id')
        .unique()
        .index()
        .references('id')
        .inTable('courses');
      tableBuilder.float('price').notNullable().defaultTo(0);
      tableBuilder.integer('discount').notNullable().defaultTo(0);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('lessons', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('section_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('sections');
      tableBuilder.string('title', 255).notNullable();
      tableBuilder.string('description').nullable();
      tableBuilder.integer('order').nullable().defaultTo(0);
      tableBuilder
        .uuid('video_id')
        .nullable()
        .index()
        .references('id')
        .inTable('stored_files');
      tableBuilder.smallint('type').defaultTo(1).notNullable();
      tableBuilder.integer('time').nullable().defaultTo(0);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
    await knex.schema.createTable('course_topics', (tableBuilder) => {
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses');
      tableBuilder
        .integer('topic_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('topics');
      tableBuilder.primary(['course_id', 'topic_id']);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('course_topics');
    await knex.schema.dropTable('lessons');
    await knex.schema.dropTable('sections');
    await knex.schema.dropTable('course_prices');
    await knex.schema.dropTable('courses');
  }
}
