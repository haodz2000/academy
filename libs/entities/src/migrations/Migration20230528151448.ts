import { MigrationWithTimestamps } from '../config/migration-with-timestamps';

export class Migration20230528151448 extends MigrationWithTimestamps {
  async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.alterTable('users', (tableBuilder) => {
      tableBuilder.string('phone', 15).nullable();
      tableBuilder.string('facebook', 255).nullable();
      tableBuilder.string('github', 255).nullable();
      tableBuilder.string('twitter', 255).nullable();
      tableBuilder.string('description', 255).nullable();
      tableBuilder.string('job', 255).nullable();
    });
  }

  async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.alterTable('users', (tableBuilder) => {
      tableBuilder.dropColumn('phone'), tableBuilder.dropColumn('facebook');
      tableBuilder.dropColumn('github');
      tableBuilder.dropColumn('twitter');
      tableBuilder.dropColumn('description');
      tableBuilder.dropColumn('job');
    });
  }
}
