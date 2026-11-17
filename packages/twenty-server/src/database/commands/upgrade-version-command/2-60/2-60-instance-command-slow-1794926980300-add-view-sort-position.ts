import { type DataSource, type QueryRunner } from 'typeorm';

import { RegisteredInstanceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-instance-command.decorator';
import { type SlowInstanceCommand } from 'src/engine/core-modules/upgrade/interfaces/slow-instance-command.interface';

@RegisteredInstanceCommand('2.60.0', 1794926980300, { type: 'slow' })
export class AddViewSortPositionSlowInstanceCommand implements SlowInstanceCommand {
  public async runDataMigration(_dataSource: DataSource): Promise<void> {
    // Runs before up(), so the backfill waits until the column exists.
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "core"."viewSort" ADD "position" double precision NOT NULL DEFAULT \'0\'',
    );
    // The original array order is gone; createdAt then id is the order already shown.
    await queryRunner.query(`
      WITH ordered AS (
        SELECT
          id,
          ROW_NUMBER() OVER (
            PARTITION BY "viewId"
            ORDER BY "createdAt" ASC, id ASC
          ) - 1 AS position
        FROM "core"."viewSort"
      )
      UPDATE "core"."viewSort" AS view_sort
      SET "position" = ordered.position
      FROM ordered
      WHERE view_sort.id = ordered.id
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "core"."viewSort" DROP COLUMN "position"',
    );
  }
}
