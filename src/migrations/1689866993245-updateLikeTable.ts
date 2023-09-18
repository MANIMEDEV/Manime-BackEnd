import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLikeTable1689866993245 implements MigrationInterface {
    name = 'UpdateLikeTable1689866993245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "imgS" TO "imgs"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "imgs" TO "imgS"`);
    }

}
