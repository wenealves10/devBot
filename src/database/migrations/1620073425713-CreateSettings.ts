import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1620073425713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "settings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "antilink",
            type: "boolean",
            default: "false",
          },
          {
            name: "welcome",
            type: "boolean",
            default: "true",
          },
          {
            name: "antifake",
            type: "boolean",
            default: "false",
          },
          {
            name: "bot_active",
            type: "boolean",
            default: "true",
          },
          {
            name: "antiflood",
            type: "boolean",
            default: "false",
          },
          {
            name: "flood_limit",
            type: "int",
            default: "10",
          },
          {
            name: "nsfw",
            type: "boolean",
            default: "false",
          },
          {
            name: "leveling",
            type: "boolean",
            default: "false",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("settings");
  }
}
