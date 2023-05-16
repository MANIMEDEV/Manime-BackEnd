import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1684204815840 implements MigrationInterface {
    name = 'UpdateTables1684204815840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_4413d216289808afda0de2bdfd4"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "commentsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "commentsId" integer`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_4413d216289808afda0de2bdfd4" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
