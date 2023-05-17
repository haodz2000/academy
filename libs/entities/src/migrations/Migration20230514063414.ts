import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230514063414 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('teaching_requests', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses');
      tableBuilder
        .integer('requester_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder.smallint('status').nullable().defaultTo(1);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('course_teachers', (tableBuilder) => {
      tableBuilder
        .integer('teacher_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses');
      tableBuilder.smallint('status').notNullable().defaultTo(1);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
      tableBuilder.primary(['teacher_id', 'course_id']);
    });

    await knex.schema.createTable('learning_requests', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses');
      tableBuilder
        .integer('requester_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder.smallint('status').nullable().defaultTo(1);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });

    await knex.schema.createTable('course_students', (tableBuilder) => {
      tableBuilder
        .integer('student_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users');
      tableBuilder
        .integer('course_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('courses');
      tableBuilder.smallint('status').notNullable().defaultTo(1);
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
      tableBuilder.primary(['student_id', 'course_id']);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('course_students');
    await knex.schema.dropTable('learning_requests');
    await knex.schema.dropTable('course_teachers');
    await knex.schema.dropTable('teaching_requests');
  }
}
