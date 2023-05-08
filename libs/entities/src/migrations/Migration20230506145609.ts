import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230506145609 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('assignments', (tableBuilder) => {
      this.addSerialPrimaryColumn(tableBuilder);
      tableBuilder.string('title', 255).notNullable();
      tableBuilder.text('description').nullable();
      tableBuilder
        .integer('lessone_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      this.addActorColumns(tableBuilder);
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  async down() {
    const knex = this.getKnexBuilder();
    await knex.schema.dropTable('assignments');
  }
}
