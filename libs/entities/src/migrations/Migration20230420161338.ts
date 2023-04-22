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
      tableBuilder
        .integer('administrator_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      tableBuilder
        .uuid('cover_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('stored_files')
        .onUpdate('CASCADE')
        .onDelete('set null');
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('sections', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder.string('title', 255).notNullable();
      tableBuilder.string('description').nullable();
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

    await knex.schema.createTable('lessons', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('section_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('sections')
        .onUpdate('CASCADE');
      tableBuilder.string('title', 255).notNullable();
      tableBuilder.string('description').nullable();
      tableBuilder.string('link', 255).notNullable();
      tableBuilder.integer('time').notNullable();
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
        .inTable('courses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tableBuilder
        .integer('topic_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('topics')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tableBuilder.primary(['course_id', 'topic_id']);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('course_subscribes', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('subscriber_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tableBuilder.smallint('status').notNullable().defaultTo(1);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('course_subscribes');
    await knex.schema.dropTable('course_topics');
    await knex.schema.dropTable('lessons');
    await knex.schema.dropTable('sections');
    await knex.schema.dropTable('courses');
  }
}
