import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1712252130117 implements MigrationInterface {
    name = 'CreateTaskTable1712252130117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_story" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
        await queryRunner.query(`ALTER TABLE "feature" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feature" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "status"`);
    }

}
