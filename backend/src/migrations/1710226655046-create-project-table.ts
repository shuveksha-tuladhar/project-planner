import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectTable1710226655046 implements MigrationInterface {
    name = 'CreateProjectTable1710226655046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
    }

}
