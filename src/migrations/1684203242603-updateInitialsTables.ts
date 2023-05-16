import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInitialsTables1684203242603 implements MigrationInterface {
    name = 'UpdateInitialsTables1684203242603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f7297f2289efb670fb2348bfa81"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_f7297f2289efb670fb2348bfa8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileInfosId"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileInfosId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_f7297f2289efb670fb2348bfa8" UNIQUE ("profileInfosId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f7297f2289efb670fb2348bfa81" FOREIGN KEY ("profileInfosId") REFERENCES "profileInfos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
