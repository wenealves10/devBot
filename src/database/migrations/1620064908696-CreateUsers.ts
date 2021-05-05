import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1620064908696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "age",
            type: "int",
          },
          {
            name: "number_phone",
            type: "varchar",
          },
          {
            name: "admin_group",
            type: "boolean",
            default: "false",
          },
          {
            name: "level",
            type: "int",
            default: "0",
          },
          {
            name: "xp",
            type: "int",
            default: "0",
          },
          {
            name: "active",
            type: "boolean",
            default: "true",
          },
          {
            name: "language",
            type: "varchar",
          },
          {
            name: "office",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "commands",
            type: "int",
            default: "0",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
