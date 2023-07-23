import { Migration } from '@mikro-orm/migrations';
import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230707102400 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('rating_courses', (tableBuilder) => {
      tableBuilder
        .integer('course_id')
        .index()
        .notNullable()
        .references('id')
        .inTable('courses');
      tableBuilder
        .integer('user_id')
        .index()
        .notNullable()
        .references('id')
        .inTable('users');
      tableBuilder.integer('point').notNullable().unsigned().checkPositive();
      tableBuilder.string('comment', 255).nullable();
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
      tableBuilder.primary(['course_id', 'user_id']);
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('rating_courses');
  }
}
