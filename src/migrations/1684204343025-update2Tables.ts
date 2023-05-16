import { MigrationInterface, QueryRunner } from "typeorm";

export class Update2Tables1684204343025 implements MigrationInterface {
    name = 'Update2Tables1684204343025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_dbd30213dd525fa7f09e5e15b2c"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "UQ_dbd30213dd525fa7f09e5e15b2c"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP COLUMN "userFollowerId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "followersId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_702a500b49d1064f7906fe6a7ea" FOREIGN KEY ("followersId") REFERENCES "followers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_702a500b49d1064f7906fe6a7ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followersId"`);
        await queryRunner.query(`ALTER TABLE "followers" ADD "userFollowerId" integer`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "UQ_dbd30213dd525fa7f09e5e15b2c" UNIQUE ("userFollowerId")`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_dbd30213dd525fa7f09e5e15b2c" FOREIGN KEY ("userFollowerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
